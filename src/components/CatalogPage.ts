import { Component } from './base/Component';
import { IEvents } from './base/Events';
import { ensureElement } from '../utils/utils';
import { Events } from '../types';

interface IPage {
	counter: number;
	sector: HTMLElement[];
	locked: boolean;
}

export class CatalogPage extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _sector: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._sector = ensureElement<HTMLElement>('.catalog__items');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {
			events.emit(Events.OPEN_CARD);
		});
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set sector(items: HTMLElement[]) {
		this._sector.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
