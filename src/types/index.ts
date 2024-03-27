export type ProductCategory = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";
export type PaymentMethod = 'cash' | 'online';

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

export interface IOrderCheckout {
  address: string;
  payment: string;
}

export type MakingAnOrder = IOrderCheckout & ICustomer;

export interface IMakingAnOrder extends MakingAnOrder {
  items: string[];
  total: number;
}

//интерфейс главной страницы
export interface MainPage {
  directory: IProduct[]; //список всех карточек на странице
  basket: IProduct[];
  card: IProduct[]; //выбранные продукты в корзине
  preview: string | null; //модальное окно карточки
  delivery: IOrderCheckout | null;
  contact: ICustomer | null;
  order: IMakingAnOrder | null;
}

export type DirectoryEvent = {
  catalog: ProductWithCart[];
}

// оформление заказа
export interface IOrderEvent extends MakingAnOrder {
  list: ProductWithCart[];
  isValidCheckout(): boolean;
  isValidPersonalData(): boolean;
  checkingTheAddress(): void;
  checkingThePhone(): void;
  checkingEmail(): void;
  completingTheOrder(): void;
}

export class OrderEvent implements IOrderEvent {
  list: ProductWithCart[] = [];
  address: string;
  payment: string;
  email: string;
  phone: string;

  isValidCheckout(): boolean {
    return !!this.address && !!this.payment;
  }

  isValidPersonalData(): boolean {
    return !!this.phone && !!this.email;
  }

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
  LOAD_PRODUCTS = "product:load", //все категории карточек
  LOT_CHANGED = "lot:changed", //изменение в карточках товара
  CLICK_PRODUCT = "cart:open", //кликнули по карточке
  PRODUCT_OPEN = "product:open", //при клике на карточку открывается модальное окно
  PRODUCT_ADD_TO_CART = "product:add",//добавить продукт в корзину
  CLOSE_MODAL = "modal:close",//приклике на креситк закрывется модальное окно
  OPEN_CARD = "card:open",//открыти корзины
  DELETE_PRODUCT ="product:remove",//удалить продукт из корзины
  ORDER_CHECKOUT = "order:checkout",//переход к оформлению заказа
  ORDER_PAYMENT_METHOD = "order:payment",//способ оплаты и адрес
  ORDER_CHECKOUT_VALIDATE = "order-checkout:validate",// подтверждение, что форма заполнена верно
  ORDER_PAYMENT_VALIDATE = "order-payment:validate",// подтверждение, что форма c email и тел верно
  ORDER_COMPLETION = "contacts:submit",//заказ оформлен
}