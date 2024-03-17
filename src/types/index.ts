type LotSection = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";
type PaymentMethod = "онлайн" | "при получении"

enum Events {
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

export interface Product {
  products: CardProduct[];
  category: LotSection;
}

export interface CardProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

//просмотр корзины с продуктом
export interface Cart {
  products: CardProduct[];
  totalPrice: number;
}

type CartItem = Product & Cart;

export interface DeliveryAddress {
  adress: string | number;
  payment: PaymentMethod;
}

export interface MakingAnOrder {
  amail: string;
  phone: string;
}

//главная страница, отслеживание
export interface MainPage {
  cart: CartItem[]; //выбранные продукты в корзине
  preview: CartItem; //просмотр продукта
  directory: CartItem[]; //все категории
  orderProducr: Cart;//отслеживание продуктов в корзине
}
