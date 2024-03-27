import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import { DirectoryEvent, Events, IMakingAnOrder, MakingAnOrder } from './types';
import { CatalogPage } from './components/CatalogPage';
import { ActionItem, ProductCard } from './components/ProductCard';
import { Modal } from './components/common/Modal';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductItem } from './components/models/ProductItem';
import { AppState } from './components/AppState';
import { WebLarekApi } from './components/api/WebLarekApi';
import { Basket, BasketItem } from './components/Basket';
import { OrderSuccess } from './components/OrderSuccess';
import { OrderCheckout } from './components/OrderCheckout';
import { OrderPayment } from './components/OrderPayment';

const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");

const orderRegistration = ensureElement<HTMLTemplateElement>("#success");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");

const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket")
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");

const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderCheckout = new OrderCheckout(cloneTemplate(orderTemplate), events);
const orderPayment = new OrderPayment(cloneTemplate(contactsTemplate), events);

const appData = new AppState({}, events);

const page = new CatalogPage(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
});

//прослушивание события отрисовка карточек
events.on<DirectoryEvent>(Events.LOAD_PRODUCTS, () => {
  page.sector = appData.catalog.map((catalogItem) => {
    const card = new ProductCard('card', cloneTemplate(cardCatalogTemplate), {
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
  appData.deleteFromTheBasket(item);
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
events.on(Events.ORDER_CHECKOUT, () => {
  modal.render({
    content: orderCheckout.render({
      address: appData.order.address,
      payment: appData.order.payment,
      valid: !appData.validateOrderCheckout(),
      errors: [],
    }),
  });
});

// Изменение состояния валидации форм доставка и способ оплаты
events.on(Events.ORDER_PAYMENT_METHOD , (errors: Partial<IMakingAnOrder>) => {
  const { address, payment } = errors;
  orderCheckout.valid = !address && !payment;
  orderCheckout.errors = Object.values({ address, payment }).filter((i) => !!i).join('; ');
});

// Изменение полей контактов и доставки
events.on(
  /^(order|contacts)\..*:change/,
  (data: { field: keyof MakingAnOrder; value: string }) => {
    appData.setRequiredFieldToFillIn(data.field, data.value);
  }
);

// изменился способ оплаты
events.on(Events.ORDER_PAYMENT_METHOD,
  (data: {
    payment: 'cash' | 'online';
    clickedButton: HTMLButtonElement;
    otherButton: HTMLButtonElement;
  }) => {
    orderCheckout.
    switchActiveButton(data.clickedButton, data.otherButton);
    appData.updatePaymentField(data.payment);
    appData.validateOrderCheckout();
  }
);

events.on(Events.ORDER_PAYMENT_METHOD, (errors: Partial<MakingAnOrder>) => {
  const { email, phone } = errors;
  orderPayment.valid = !email && !phone;
  orderPayment.errors = Object.values({ phone, email }).filter((i) => !!i).join('; ');
});

// подтверждение, что форма заполнена верно
events.on(Events.ORDER_CHECKOUT_VALIDATE, (data: {errorMsg: string| null}) => {
  orderCheckout.valid = !data.errorMsg;
  orderCheckout.errors = data.errorMsg;
});

events.on('order:submit', () => {
  modal.render({
    content: orderPayment.render({
      phone: appData.order.phone,
      email: appData.order.email,
      valid: !appData.validateOrderPersonalData(),
      errors: [],
    }),
  });
});

events.on(Events.ORDER_PAYMENT_VALIDATE, (data: {errorMsg: string| null}) => {
  orderPayment.valid = !data.errorMsg;
  orderPayment.errors = data.errorMsg;
});


events.on(Events.ORDER_COMPLETION, () => {
  api
    .orderLots({
      ...appData.order,
      total: appData.getFull(),
      items: appData.getSelectedProducts().map((el) => el.id),
    })
    .then((result) => {
      const orderSuccess = new OrderSuccess(cloneTemplate(orderRegistration), {
        onClick: () => {
          modal.close();
        },
      });
      appData.clearBasket();
      modal.render({
        content: orderSuccess.render({
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

api.getProductList()
  .then((response) => {
    appData.setCatalog(response.items);
  })
  .catch(err => console.error(err));
