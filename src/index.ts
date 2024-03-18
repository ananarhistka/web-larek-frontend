
import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ICartModel, IEventEmitter, CartlogoModal, IView, IViewConsstructor } from './types';


class CartModel implements ICartModel {
  items: Map<string, number> = new Map();

  constructor(protected events: IEventEmitter) { };

  add(id: string): void {
    this._changed();
  }
  remove(id: string): void {
    this._changed();
  }

  protected _changed() {
    this.events.emit("basket:change", { items: Array.from(this.items.keys()) });
  }
}

const events = new EventEmitter();

const cart = new CartModel(events);

events.on("basket:change", (data: { items: string[] }) => {
  //выводим куда то
})

class CartItemView implements IView {
  //элементы внутри контейнера
  protected title: HTMLSpanElement;
  protected addButton: HTMLButtonElement;
  protected removeButton: HTMLButtonElement;

  //данные которые хотим сохранить на будущее
  protected id: string | null = null;

  constructor(protected container: HTMLElement, protected events: IEventEmitter) {
    this.title = container.querySelector(".basket-item__title") as HTMLSpanElement;
    this.addButton = container.querySelector(".basket-item__add") as HTMLButtonElement;
    this.removeButton = container.querySelector(".basket-item__remove") as HTMLButtonElement;

    //устанавливаем событие
    this.addButton.addEventListener("click", () => {
      //генерируем ссобытие в новом брокере
      this.events.emit("ui:basket-add", { id: this.id });
    });

    this.addButton.addEventListener("click", () => {
      this.events.emit("ui:basket-remove", { id: this.id });
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

