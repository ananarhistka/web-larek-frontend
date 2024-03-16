type LotSection = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";
type PaymentMethod = "онлайн" | "при получении"

export interface Product {
  products: CartProduct[];
  category: LotSection;
}

//отслеживание добавился ли продукт
export interface AddProduct {
  addProductToCart: boolean;
  addToCart: () => void;//добавить
  removeFromeCars: () => void;//удалить
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
