export type ProductCategory = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";

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

export type ProductWithCart = IProduct & IProductAction;

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
  payment: string;
}

export type MakingAnOrder = ICustomerAddress & ICustomer;

export interface IMakingAnOrder extends MakingAnOrder {
  items: string[];
  total: number;
}

// Заполнение спороба оплаты и адреса доставки в модалке
//export interface FirstStageOrderModalAction {
  //selectPaymentMethod(paymentMethod: string): void;
  //setAddress(address: string): void;
  // проверяем корректность данных, если есть ошибки, то блокируем кнопку "Продолжить"
  //canMoveNextStage(): boolean;
  // Функция меняющая этап оформления заказа
  //nextStage(): void;
//}

// Заполнение спороба оплаты и адреса доставки в модалке
//export interface SecondStageOrderModalAction {
  //isSuccessOrderCreated: boolean; // Успешно ли оплатили и оформили заказ
  //setCustomerInfo(customer: ICustomer): void;
  // Корректны ли телефон и емейл
  //isValid(): boolean;
  //pay(): void; // оплачиваем и меняем флаг isSuccessOrderCreated на true
//}

//интерфейс главной страницы
export interface MainPage {
  directory: IProduct[]; //список всех карточек на странице
  basket: IProduct[];
  card: IProduct[]; //выбранные продукты в корзине
  preview: string | null; //модальное окно карточки
  delivery: ICustomerAddress | null;
  contact: ICustomer | null;
  order: IMakingAnOrder | null;
}

// интерфейс для хранения списка товаров
//export interface CartlogoModal {
  //items: IProduct[];
  //setItems(items: IProduct[]): void; // чтобы установить после загрузки из апи
  //getProduct(id: string): IProduct[]; // чтобы получить при загрузки из апи
//}

export type DirectoryEvent = {
  catalog: ProductWithCart[];
}

// оформление заказа
export interface IOrderEvent extends MakingAnOrder {
  list: ProductWithCart[];
  checkingTheAddress(): void;
  checkingThePhone(): void;
  checkingEmail(): void;
  completingTheOrder(): void;
}

export class OrderEvent implements IOrderEvent {
  list: ProductWithCart[] = [];
  address: string | number;
  payment: string;
  email: string;
  phone: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  checkingTheAddress(): void {

  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  checkingThePhone(): void {

  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  checkingEmail(): void {

  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  completingTheOrder(): void {

  }
}

export type IFormErrors = Partial<Record<keyof MakingAnOrder, string>>;

export enum Events {
  CATALOG_PRODUCTS = "product:changed", //все категории карточек
  LOT_CHANGED = "lot:changed", //изменение в карточках товара
  CLICK_PRODUCTS = "cart:open", //кликнули по карточке
  PRODUCT_OPEN = "product:open", //при клике на карточку открывается модальное окно
  PRODUCT_ADD_TO_CART = "product:add",//добавить продукт в корзину
  CLOSE_MODAL = "modal:close",//приклике на креситк закрывется модальное окно
  OPEN_CARD = "card:open",//открыти корзины
  DELETE_PRODUCT ="product:remove",//удалить продукт из корзины
  MAKING_AN_ORDER = "making-order:open",//переход к оформлению заказа
  PAYMENT_METHOD = "payment:changed",//способ оплаты и адрес
  CONFIRMATION_OF_FILLING_DATA = "order:complete",//подтвержение что форма заполнена верно
  ORDER_COMPLETION = "order-completion:complete",//заказ оформлен
}