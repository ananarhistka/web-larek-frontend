import { IMakingAnOrder, MakingAnOrder, ProductWithCart, IProduct } from '../../types';
import { Api, ApiListResponse } from '../base/api';

export interface IWebLarekApi {
	getProductList: () => Promise<ApiListResponse<IProduct>>;
	getProductItem: (id: string) => Promise<ProductWithCart>;
	orderLots: (order: IMakingAnOrder) => Promise<MakingAnOrder>;
}

export class WebLarekApi extends Api implements IWebLarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	async getProductList(): Promise<ApiListResponse<IProduct>> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) => {
			return {
				total: data.total,
				items: data.items.map((item) => ({
					...item,
					image: this.cdn + item.image,
					isOrdered: false,
				})),
			};
		});
	}

	async getProductItem(id: string): Promise<ProductWithCart> {
		return this.get(`/product/${id}`).then((item: ProductWithCart) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	async orderLots(order: IMakingAnOrder): Promise<IMakingAnOrder> {
		return this.post('/order', order).then((data: IMakingAnOrder) => data);
	}
}
