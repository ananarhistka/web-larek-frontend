type LotSection = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";
type PaymentMethod = "онлайн" | "при получении"

export interface Product {
  products: CartProduct[];
  category: LotSection;
}

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

//просмотр корзины с продуктом
export interface Cart {
  products: CartProduct[];
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
