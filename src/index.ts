import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { WebLarekApi } from './components/WebLarekApi';
import { AppState, ProductItem } from './components/AppData';
import { API_URL, CDN_URL } from './utils/constants';
import { DirectoryEvent, Events, MakingAnOrder } from './types';
import { Page } from './components/WebPage';
import { CustomerAddress, Customer } from './components/Ordet';
import { Card, ActionItem} from './components/Card';
import { Modal } from './components/common/Modal';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Basket, BasketItem } from './components/common/Basket';
import { Success } from './components/common/Success';

const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
});

//карточки 
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");

//оформление заказа
const orderRegistration = ensureElement<HTMLTemplateElement>("#success");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");

//корзина

const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket")
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new CustomerAddress(cloneTemplate(orderTemplate), events);
const customer = new Customer(cloneTemplate(contactsTemplate), events);

// Модель данных приложения
const appData = new AppState({}, events);

//глобальные контейнера
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

//прослушивание события отрисовка карточек
events.on<DirectoryEvent>(Events.CATALOG_PRODUCTS, () => {
  page.sector = appData.catalog.map((catalogItem) => {
    const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit(Events.PRODUCT_OPEN, catalogItem),
    });
    
    return card.render({
      title: catalogItem.title,
      image: catalogItem.image,
      price: catalogItem.price,
      category: catalogItem.category,
    });
  });
});

//открытик модалки
events.on(Events.PRODUCT_OPEN, (item: ProductItem) => {
  appData.setPreview(item);

});
events.on(Events.PRODUCT_ADD_TO_CART, (item: ProductItem) => {
  appData.basketOnWheels(item);

  page.counter = (appData.basket.products || []).length;
});

// Отрисовка модалки карточки
events.on(Events.PRODUCT_OPEN, (item: ProductItem) => {
  const card = new ActionItem(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      events.emit(Events.PRODUCT_ADD_TO_CART, item);
      events.emit(Events.PRODUCT_OPEN, item);
    },
  });
  modal.render({
    content: card.render({
      title: item.title,
      image: item.image,
      description: item.description,
      price: item.price,
      button: item.isOrdered,
    }),
  });
});

// открытие и отрисовка корзины
events.on(Events.OPEN_CARD, () => {
  modal.render({
    content: basket.render(),
  });
});

  //событие удаление по кнопке в корзине
  events.on(Events.DELETE_PRODUCT, (item: ProductItem) => {
    appData.deleteFromBasketTotal(item);
  });

//добавление в корзину и отрисовка добавленного
events.on(Events.LOT_CHANGED, () => {
  page.counter = appData.getSelectedProducts()?.length;
  basket.items = appData.getSelectedProducts().map((item, id) => {
    const CardTemplate = new BasketItem(cloneTemplate(cardBasketTemplate), { onClick: () => {
        events.emit(Events.DELETE_PRODUCT, item);
      },
    });
    return CardTemplate.render({
      title: item.title,
      price: item.price,
      id: id + 1,
    });
  });
  basket.total = appData.getFull();
});

// мадальное окно с адресом при заказе
events.on(Events.MAKING_AN_ORDER, () => {
  modal.render({
    content: order.render({
      address: order.address,
      payment: order.payment,
      valid: false,
      errors: [],
    }),
  });
});

events.on(Events.PAYMENT_METHOD , (errors: Partial<MakingAnOrder>) => {
  const { address, payment } = errors;
  order.valid = !address && !payment;
  order.errors = Object.values({ address, payment })
    .filter((i) => !!i)
    .join('; ');
});

// мадальное окно с телефоном
events.on(Events.CONFIRMATION_OF_FILLING_DATA, () => {
  modal.render({
    content: customer.render({
      phone: '',
      email: '',
      valid: false,
      errors: [],
    }),
  });
});

events.on(
  /^(order|contacts)\..*:change/,
  (data: { field: keyof MakingAnOrder; value: string }) => {
    appData.setRequiredFieldToFillIn(data.field, data.value);
  }
);

events.on(Events.PAYMENT_METHOD, (errors: Partial<MakingAnOrder>) => {
  const { email, phone } = errors;
  customer.valid = !email && !phone;
  customer.errors = Object.values({ phone, email })
    .filter((i) => !!i)
    .join('; ');
});

events.on(Events.ORDER_COMPLETION, () => {
  api
    .orderLots({
      ...appData.order,
      total: appData.getFull(),
      items: appData.getSelectedProducts().map((el) => el.id),
    })
    .then((result) => {
      const success = new Success(cloneTemplate(orderRegistration), {
        onClick: () => {
          modal.close();
        },
      });
      appData.clearBasket();
      modal.render({
        content: success.render({
          total: result.total,
        }),
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

// Блокируем прокрутку страницы если открыта модалка
  events.on(Events.PRODUCT_OPEN, () => {
    page.locked = true;
  });

// ... и разблокируем
  events.on(Events.CLOSE_MODAL, () => {
    page.locked = false;
  });

  api.getLotList()
    .then((response) => {
      appData.setCatalog(response.items);
    })
    .catch(err => console.error(err));
