import { Model } from '../base/Model';
import { ProductCategory, ProductWithCart } from '../../types';

export class ProductItem extends Model<ProductWithCart> {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number | null;
	isOrdered: boolean;
	category: ProductCategory;
}
