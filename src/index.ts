import './scss/styles.scss';

//изменение количество товара в корзине
interface ICartMadel {
  items: Map<string, number>;
  add(id: string): void;
  remove(id: string): void;
}

class CartModel implements ICartMadel {
  items: Map<string, number> = new Map();
  
  add(id: string): void {
    if (!this.items.has(id)) this.items.set(id, 0); //создание новой
    this.items.set(id, this.items.get(id)! +1)//прибавляем количество
  }
  remove(id: string):void{
    
  }
}