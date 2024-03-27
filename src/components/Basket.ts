import { Component } from './base/Component';
import { EventEmitter } from './base/events';
import { ensureElement, createElement } from '../utils/utils';
import { Events } from '../types';

interface IBasketView {
	items: HTMLElement[];
	total: number;
	selected: string[];
}

export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = ensureElement<HTMLElement>('.basket__price', this.container);
		this._button = this.container.querySelector('.basket__button');

		this.items = [];

		if (this._button) {
			if (!this.items?.length) {
				this._button.disabled = true;
			}
			this._button.addEventListener('click', () => {
				events.emit(Events.ORDER_CHECKOUT);
			});
		}

	}
	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this._button.disabled = false;
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this._button.disabled = true;
		}
	}

	set selected(total: number) {
		if (total > 0) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
	}

	set total(price: number) {
		this.setText(this._total, `${price} синапсов`);
	}
}

interface IProductOpenBasket {
	id: number;
	title: string;
	price: string | number;
}
interface IClick {
	onClick: (event: MouseEvent) => void;
}

export class BasketItem extends Component<IProductOpenBasket> {
	protected _id: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _prices: number[] = [];

	constructor(container: HTMLElement, actions?: IClick) {
		super(container);

		this._id = ensureElement<HTMLElement>('.basket__item-index', container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = ensureElement<HTMLButtonElement>('.card__button', container);
		this._button.addEventListener('click', actions.onClick);
	}
	set title(value: string) {
		this.setText(this._title, value);
	}

	set id(value: number) {
		this.setText(this._id, value);
	}

	set price(value: string) {
		this.setText(this._price, `${value} синапсов`);
		this._prices.push(parseFloat(value));
	}
}
