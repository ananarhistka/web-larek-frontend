import { IOrderCheckout } from '../types';
import { IEvents } from './base/Events';
import { ensureElement } from '../utils/utils';
import { Form } from './common/Form';

export class OrderCheckout extends Form<IOrderCheckout> {
	protected _containerPay: HTMLDivElement;
	protected _buttonsPaymentOffline: HTMLButtonElement;
	protected _buttonsPaymentOnline: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._containerPay = ensureElement<HTMLDivElement>(
			'.order__buttons',
			this.container
		);
		this._buttonsPaymentOffline = this._containerPay.querySelector('[name=cash]');
		this._buttonsPaymentOnline = this._containerPay.querySelector('[name=card]');

		if (this._buttonsPaymentOffline) {
			this._buttonsPaymentOffline.addEventListener('click', (e) => {
				e.preventDefault();
				this.payment = 'При получении';
			});
		}

		if (this._buttonsPaymentOnline) {
			this._buttonsPaymentOnline.addEventListener('click', (e) => {
				e.preventDefault();
				this.payment = 'Онлайн';
			});
		}
	}

	switchActiveButton(clickedButton: HTMLButtonElement, otherButton: HTMLButtonElement) {
		clickedButton.classList.add('button_alt-active');
		otherButton.classList.remove('button_alt-active');
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value = value || '';
	}

	set payment(value: string) {
		if (value === 'Онлайн') {
			this._buttonsPaymentOnline.classList.add('button_alt-active');
			this._buttonsPaymentOffline.classList.remove('button_alt-active');
		} else if (value === 'При получении') {
			this._buttonsPaymentOffline.classList.add('button_alt-active');
			this._buttonsPaymentOnline.classList.remove('button_alt-active');
		}

		this.onInputChange('payment', value);
	}
}
