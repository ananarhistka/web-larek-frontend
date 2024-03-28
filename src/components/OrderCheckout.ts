import { IOrderCheckout, IOrderEvent, ProductWithCart } from '../types';
import { IEvents } from './base/Events';
import { ensureElement } from '../utils/utils';
import { Form } from './common/Form';

export class OrderEvent implements IOrderEvent {
	list: ProductWithCart[] = [];
	address: string;
	payment: string;
	email: string;
	phone: string;

	checkingThePaymentMethod(): string | null {
		if (!this.payment) {
			return 'Необходимо указать способ оплаты';
		}
		return null;
	}
	checkingTheAddress(): string | null {
		if (!this.address) {
			return 'Необходимо указать адрес';
		}
		return null;
	}
	checkingThePhone(): string {
		if (!this.phone) {
			return 'Необходимо указать телефон';
		}
		if (!/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(this.phone)) {
			return 'Укажите корректный телефон';
		}
		return null;
	}
	checkingEmail(): string | null {
		if (!this.email) {
			return 'Необходимо указать email';
		}
		if (!/^\w+[\w.-]*@\w+[\w.-]*\.[a-zA-Z]{2,3}$/.test(this.email)) {
			return 'Укажите корректный email';
		}
		return null;
	}

}
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

		this.onControlChange('payment', value);
	}
}
