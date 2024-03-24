import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { ensureElement, createElement } from '../../utils/utils';
import { Events } from '../../types';

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
				// events.emit(Events.OPEN_CARD);
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

	set selected(items: string[]) {
		if (items.length) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
	}

	set total(price: number) {
		this.setText(this._total, `${price} синапсов`);
	}
}