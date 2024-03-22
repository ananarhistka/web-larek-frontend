import { MainPage, ProductWithCart, IOrderEvent } from '../types';
import {Model} from "./base/Model";

export class CatalogModel extends Model<MainPage> {
  directory: ProductWithCart[];
  card: ProductWithCart[];
  order: IOrderEvent = {
		email: "",
		phone: "",
		items: [],
		address: "",
		payment: "",
};
