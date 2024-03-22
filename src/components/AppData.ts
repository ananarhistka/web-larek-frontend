import { MainPage } from '../types';
import {Model} from "./base/Model";

export class CatalogModel extends Model<MainPage> {
  id: string;
  price: number|null;
  image: string;
}
