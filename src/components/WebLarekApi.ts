import { Api, ApiListResponse } from './base/api';
import { IOrder, ProductWithCart } from '../types';

export interface IWebLarekApi {
  getLotList: () => Promise<ProductWithCart[]>;
  getLotItem: (id: string) => Promise<ProductWithCart>;
  orderLots: (order: IOrder) => Promise<IOrder>;
}

export class WebLarekApi extends Api implements IWebLarekApi {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getLotList(): Promise<ProductWithCart[]> {
    return this.get('/product').then((data: ApiListResponse<ProductWithCart>) => {
      return data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image,
        isOrdered: false,
      }));
    });
  }

  getLotItem(id: string): Promise<ProductWithCart> {
    return this.get(`/product/${id}`).then((item: ProductWithCart) => ({
      ...item,
      image: this.cdn + item.image,
    }));
  }

  orderLots(order: IOrder): Promise<IOrder> {
    return this.post('/order', order).then((data: IOrder) => data);
  }
}