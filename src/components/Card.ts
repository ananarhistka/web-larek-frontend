import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IProduct } from '../types'

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
  protected _id: HTMLElement;
  protected _title: HTMLElement;
  protected _price?: HTMLElement;
  protected _description?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _sector?: HTMLElement;
  protected _button?: HTMLButtonElement;

  constructor(
    protected blockName: string,
    protected container: HTMLElement,
    actions?: ICardActions
  ) {
    super(container);

    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._price = container.querySelector(`.${blockName}__price`);
    this._description = container.querySelector(`.${blockName}__text`);
    this._image = ensureElement<HTMLImageElement>(
      `.${blockName}__image`,
      container
    );
    this._button = container.querySelector(`.${blockName}__button`);

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }
  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id(): string {
    return this.container.dataset.id || '';
  }

  set price(value: string) {
    if (value == null) {
      this.setText(this._price, 'Бесценно');
    } else {
      this.setText(this._price, value + 'синапсов');
    }
  }

  get price(): string {
    return this._price.textContent || '';
  }

  set sector(value: string) {
    const sectorElement = this.container.querySelector(
      `.${this.blockName}__category`
    );

    sectorElement.textContent = value;

    let sectorValue = '';

    switch (value) {
      case 'софт-скил':
        sectorValue = 'soft';
        break;
      case 'другое':
        sectorValue = 'other';
        break;
      case 'кнопка':
        sectorValue = 'button';
        break;
      case 'хард-скил':
        sectorValue = 'hard';
        break;
      case 'дополнительное':
        sectorValue = 'additional';
        break;
      default:
        sectorValue = '';
        break;
    }
    sectorElement.classList.add(
      `${this.blockName}__sector_${sectorValue}`
    );
  }

  get sector(): string {
    return this._sector.textContent || '';
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  get title(): string {
    return this._title.textContent || '';
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  set description(value: string) {
    this.setText(this._description, value);
  }
}

export class Action extends Card {
  protected _status: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);
  }

  set button(value: boolean) {
    const price = this._price.innerText;

    if (price === 'Бесценно') {
      this._button.disabled = true;
    } else {
      this._button.disabled = false;
    }

    this.setText(this._button, value ? 'Удалить' : 'В корзину');
  }

  set description(value: string) {
    this.setText(this._description, value);
  }
}
export class ActionItem extends Card {
  protected _status: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);

  }

  set button(value: boolean) {
    const price = this._price.innerText;

    if (price === 'Бесценно') {
      this._button.disabled = true;
    } else {
      this._button.disabled = false;
    }

    this.setText(this._button, value ? 'Удалить' : 'В корзину');
  }

  set description(value: string) {
    this.setText(this._description, value);
  }
}
/*import { EventEmitter } from './components/base/events';
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
});*/

