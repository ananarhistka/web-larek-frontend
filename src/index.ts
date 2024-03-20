
/*import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ICartModel, IEventEmitter, CartlogoModal, IView, IViewConstructor } from './types';


class CartModel implements ICartModel {
  items: Map<string, number> = new Map();

  constructor(protected eventEmitter: IEventEmitter) { };

  add(id: string): void {
    this.items.set(id, (this.items.get(id) || 0) + 1);
    this._changed();
  }
  
  remove(id: string): void {
    if (this.items.has(id)) {
      const count = this.items.get(id);
      if (count && count > 1) {
        this.items.set(id, count - 1);
      } else {
        this.items.delete(id);
      }
      this._changed();
    }
  }

  protected _changed() {
    this.eventEmitter.emit("basket:change", { items: Array.from(this.items.keys()) });
  }
}

const eventEmitter = new EventEmitter();

const cart = new CartModel(eventEmitter);

eventEmitter.on("basket:change", (data: { items: string[] }) => {
  //выводим куда-то
});

class CartItemView implements IView {
  protected title: HTMLSpanElement;
  protected addButton: HTMLButtonElement;
  protected removeButton: HTMLButtonElement;
  protected id: string | null = null;

  constructor(protected container: HTMLElement, protected eventEmitter: IEventEmitter) {
    this.title = container.querySelector(".basket-item__title") as HTMLSpanElement;
    this.addButton = container.querySelector(".basket-item__add") as HTMLButtonElement;
    this.removeButton = container.querySelector(".basket-item__remove") as HTMLButtonElement;

    this.addButton.addEventListener("click", () => {
      this.eventEmitter.emit("ui:basket-add", { id: this.id });
    });

    this.removeButton.addEventListener("click", () => {
      this.eventEmitter.emit("ui:basket-remove", { id: this.id });
    });
  }

  render(data: { id: string, title: string }) {
    if (data) {
      this.id = data.id;
      this.title.textContent = data.title;
    }
    return this.container;
  }
}

class CartView implements IView {
  constructor(protected container: HTMLElement) { }
  render(data: { items: HTMLElement[] }) {
    if (data) {
      this.container.replaceChildren(...data.items);
    }
    return this.container;
  }
}

const api = new ShopAPI();
const eventsEmitter = new EventEmitter();
const basketView = new CartView(document.querySelector(".basket"));
const basketModel = new CartModel(eventEmitter);
const catalogModel = new CatalogModel(eventEmitter);

function renderBasket(items: string[]) {
  basketView.render(
    items.map(id => {
      const itemView = new CartItemView(eventsEmitter);
      return itemView.render(catalogModel.getProduct(id));
    })
  )
}

eventsEmitter.on("basket:change", (event: { items: string[] }) => {
  renderBasket(event.items);
});

eventsEmitter.on("ui:basket-add", (event: { id: string }) => {
  basketModel.add(event.id);
});

eventsEmitter.on("ui:basket-remove", (event: { id: string }) => {
  basketModel.remove(event.id);
});

api.getCatalog()
  .then(catalogModel.setItems.bind(catalogModel))
  .catch(err => console.error(err));
