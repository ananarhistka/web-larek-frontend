export type LotSection = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";
export type PaymentMethod = "онлайн" | "при получении"

//интерфейс карточки товара
export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  sector: LotSection[];
}

//изменение количество товара в корзине
export interface ICartModel {
  items: Map<string, number>;
  add(id: string): void;
  remove(id: string): void;
}

//интерфейс для хранения списка товаров
export interface CartlogoModal {
  items: IProduct[];
  setItems(items: IProduct[]): void;//чтобы установить после загрузки из апи
  getProduct(id: string): IProduct[];//чтобы получить при загрузки из апи
}

export interface IEventEmitter {
  emit: (event: string, data: unknown) => void;
}

//для конструктора
export interface IViewConstructor {
  new (container: HTMLElement, events?: IEventEmitter): IView;//на входе контейнер, в него будем выводиьт
}
//для самого класса отображения
export interface IView {
  render(data?: object): HTMLElement;//устанавливаем данные возвращаем контейнер
}

export interface MakingAnOrder {
  email: string;
  phone: string;
}

export interface DeliveryAddress {
  address: string | number;
  payment: PaymentMethod;
}

export type ICartItem = IProduct & ICartModel;
export type IMakingAnOrder = DeliveryAddress & MakingAnOrder;

export interface IOrderApi extends IMakingAnOrder {
  list: string[];
  fullPrice: number;
}

//оформление заказа
export interface IOrder extends IMakingAnOrder {
  list: ICartItem [];
  checkingTheAddress(): void;
  checkingThePhone(): void;
  checkingEmail(): void;
  completingTheOrder(): void;
}

//интерфейс главной страницы
export interface MainPage {
  directory: ICartItem[]; //список всех карточек на странице
  cart: ICartItem[]; //выбранные продукты в корзине
  preview: ICartItem; //модальное окно карточки
  getFullPrice: number;//получить поную стоймось заказа
}

export enum Events {
  CATALOG_PRODUCTS = "product:changed", //все категории карточек
  HOVER_PRODUCTS = "product:hover",//навели на карточку
  CLICK_PRODUCTS = "card:open", //кликнули по карточке
  OPEN_MODAL = "modal:open", //при клике на карточку открывается модальное окно
  CLOSE_MODAL = "modal:close",//приклике на креситк закрывется модальное окно
  CHANGING_PRODUCT_CART = "cart:changed",//добавить продукт в корзину
  OPEN_CART = "cart:open",//открыти корзины
  MAKING_AN_ORDER = "making-order:open",//переход к оформлению заказа
  PAYMENT_METHOD = "payment:changed",//способ оплаты
  FILLING_IN_FIELDS_WHITH_DATE = "data-field:changed",//заполняем поля данными 
  ORDER_COMPLETION = "order-completion:post",//заказ оформлен
}