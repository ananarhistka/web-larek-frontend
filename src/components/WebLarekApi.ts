import { Api, ApiListResponse } from './base/api';
import { IMakingAnOrder, MakingAnOrder, ProductWithCart, IProduct } from '../types';

export interface IWebLarekApi {
  getLotList: () => Promise<ApiListResponse<IProduct>>;
  getLotItem: (id: string) => Promise<ProductWithCart>;
  orderLots: (order: IMakingAnOrder) => Promise<MakingAnOrder>;
}

export class WebLarekApi extends Api implements IWebLarekApi {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getLotList(): Promise<ApiListResponse<IProduct>> {
    return this.get('/product').then((data: ApiListResponse<IProduct>) => {
      return {
        total: data.total,
        items: data.items.map((item) => ({
          ...item,
          image: this.cdn + item.image,
          isOrdered: false,
        }))
      };
    });
  }

  getLotItem(id: string): Promise<ProductWithCart> {
    return this.get(`/product/${id}`).then((item: ProductWithCart) => ({
      ...item,
      image: this.cdn + item.image,
    }));
  }

  orderLots(order: IMakingAnOrder): Promise<MakingAnOrder> {
    return this.post('/order', order).then((data: MakingAnOrder) => data);
  }
}