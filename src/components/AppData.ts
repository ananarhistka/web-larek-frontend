import { IFormErrors, MainPage, ProductWithCart, IOrderEvent, MakingAnOrder, PaymentMethod, OrdetEvent } from '../types';
import { Model } from "./base/Model";
import { IEvents } from './base/events';

export type CatalogChangeEvent = {
	catalog: ProductWithCart[];
};

//модель элемента лота
export class ProductItem extends Model<ProductWithCart> {
	id: string;
	name: string;
	about: string;
	description: string;
	image: string;
	price: number | null;
	isOrdered: boolean;
	sector: string;
	status: IOrderEvent;
}

//модель текущего состояния
export class AppState extends Model<MainPage> {
	basket: ProductWithCart[];
	catalog: ProductWithCart[];
	order: IOrderEvent = new OrdetEvent();
	preview: string | null;
	formErrors: IFormErrors = {};
}

