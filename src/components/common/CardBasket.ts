import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { ensureElement, createElement } from '../../utils/utils';
import { Events, IProduct } from '../../types';

interface IBasketProductView {
	product: IProduct;
}

export class CardBasket extends Component<IBasketProductView> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events?: EventEmitter) {
		super(container);
		this._title = this.container.querySelector('.card__title');
		this._price = this.container.querySelector('.card__price');
		this._button = this.container.querySelector('.card__button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				console.log('TODO [basket__item-delete]');
				// events.emit(Events.OPEN_CART);
			});
		}
	}

	set product(product: IProduct) {
		console.log('[___product]', product);
		this.setText(this._title, product.title);
	}

}