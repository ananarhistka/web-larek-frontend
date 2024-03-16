type LotSection = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";
type PaymentMethod = "онлайн" | "при получении"

export interface Product {
  products: CartProduct[];
  category: LotSection;
}

export interface AddProduct {
  addToCart: () => void;
  removeFromeCars: () => void;
}

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Cart {
  products: CartProduct[];
  totalPrice: number;
}

type ProductItem = Product & AddProduct;

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
  cart: ProductItem[]; //выбранные продукты в корзине
  preview: ProductItem; //просмотр продукта
  directory: ProductItem[]; //все категории
  orderProducr: AddProduct;//отслеживание продуктов в корзине
}
