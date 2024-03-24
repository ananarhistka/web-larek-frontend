import { Api, ApiListResponse } from './base/api';
import { IOrderEvent, ProductWithCart, IProduct } from '../types';

export interface IWebLarekApi {
  getLotList: () => Promise<ApiListResponse<IProduct>>;
  getLotItem: (id: string) => Promise<ProductWithCart>;
  orderLots: (order: IOrderEvent) => Promise<IOrderEvent>;
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

  orderLots(order: IOrderEvent): Promise<IOrderEvent> {
    return this.post('/order', order).then((data: IOrderEvent) => data);
  }
}