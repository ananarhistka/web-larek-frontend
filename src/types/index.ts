export type ProductCategory = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";
export type PaymentMethod = "онлайн" | "при получении"

// интерфейс по хранению товара
export interface IProduct {
  id: string;
  title: string;
  price: number | null;
  description: string;
  image: string;
  category: ProductCategory;
  button?: boolean;
}

// работа с корзиной
export interface IProductAction {
  isAdded(): boolean; // добавлен ли товар в корзину
  add(): void; // добавить товар в корзину
  remove(): void; // Удалить товар из корзины
}

// интерфейс по данным в корзине
export interface ICart {
  products: IProduct[];
  totalPrice: number;
}

// работа с корзиной
export interface ICartAction {
  createOrder(): void;
  closeModal(): void;
  loadCart(): void; // загругрузить по API данные, добавленные в карту
}

export interface ICustomer {
  email: string;
  phone: string;
}

export interface ICustomerAddress {
  address: string | number;
  payment: PaymentMethod;
}

export interface IOrder {
  products: IProduct[];
  totalPrice: number;
  customer: ICustomer;
  paymentMethod: PaymentMethod;
  address: string;
}

// Заполнение спороба оплаты и адреса доставки в модалке
export interface FirstStageOrderModalAction {
  selectPaymentMethod(paymentMethod: PaymentMethod): void;
  setAddress(address: string): void;
  // проверяем корректность данных, если есть ошибки, то блокируем кнопку "Продолжить"
  canMoveNextStage(): boolean;
  // Функция меняющая этап оформления заказа
  nextStage(): void;
}

// Заполнение спороба оплаты и адреса доставки в модалке
export interface SecondStageOrderModalAction {
  isSuccessOrderCreated: boolean; // Успешно ли оплатили и оформили заказ
  setCustomerInfo(customer: ICustomer): void;
  // Корректны ли телефон и емейл
  isValid(): boolean;
  pay(): void; // оплачиваем и меняем флаг isSuccessOrderCreated на true
}


export type ProductWithCart = IProduct & IProductAction;

//интерфейс главной страницы
export interface MainPage {
  directory: ProductWithCart[]; //список всех карточек на странице
  card: ProductWithCart[]; //выбранные продукты в корзине
  preview: ProductWithCart; //модальное окно карточки
  getFullPrice: number;//получить поную стоймось заказа
  order: IOrderEvent | null;
}

// интерфейс для хранения списка товаров
export interface CartlogoModal {
  items: IProduct[];
  setItems(items: IProduct[]): void; // чтобы установить после загрузки из апи
  getProduct(id: string): IProduct[]; // чтобы получить при загрузки из апи
}

export type DirectoryEvent = {
  directore: ProductWithCart[];
}

export type MakingAnOrder = ICustomerAddress & ICustomer;

// оформление заказа
export interface IOrderEvent extends MakingAnOrder {
  list: ProductWithCart[];
  checkingTheAddress(): void;
  checkingThePhone(): void;
  checkingEmail(): void;
  completingTheOrder(): void;
}

export class OrdetEvent implements IOrderEvent {

  list: ProductWithCart[] = [];
  address: string | number;
  payment: PaymentMethod;
  email: string;
  phone: string;

  checkingTheAddress(): void {

  }
  checkingThePhone(): void {

  }
  checkingEmail(): void {

  }
  completingTheOrder(): void {

  }
}

export type IFormErrors = Partial<Record<keyof MakingAnOrder, string>>;

export enum Events {
  CATALOG_PRODUCTS = "product:changed", //все категории карточек
  LOT_CHANGED = "lot:changed", //изменение в карточках товара
  HOVER_PRODUCTS = "product:hover",//навели на карточку
  CLICK_PRODUCTS = "cart:open", //кликнули по карточке
  PRODUCT_OPEN = "product:open", //при клике на карточку открывается модальное окно
  PRODUCT_ADD_TO_CART = "product:add",//добавить продукт в корзину
  CLOSE_MODAL = "modal:close",//приклике на креситк закрывется модальное окно
  OPEN_CARD = "card:open",//открыти корзины
  DELETE_PRODUCT ="product:remove",//удалить продукт из корзины
  MAKING_AN_ORDER = "making-order:open",//переход к оформлению заказа
  PAYMENT_METHOD = "payment:changed",//способ оплаты
  FILLING_IN_FIELDS_WITH_DATE = "data-field:changed",//заполняем поля данными
  ORDER_COMPLETION = "order-completion:complete",//заказ оформлен
}