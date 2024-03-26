import { Form } from "./common/FormBasket";
import { ICustomer, ICustomerAddress, MakingAnOrder } from '../types';
import { IEvents} from "./base/events";
import { ensureElement } from "../utils/utils";

export class Customer extends Form<ICustomer> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value = value;
	}
}

export class CustomerAddress extends Form<ICustomerAddress> {
	payment: string;
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
				this.setPayment('payment', 'При получении');
				this._buttonsPaymentOffline.classList.add('button_alt-active');
				this._buttonsPaymentOnline.classList.remove('button_alt-active');
			});
		}

		if (this._buttonsPaymentOnline) {
			this._buttonsPaymentOnline.addEventListener('click', (e) => {
				e.preventDefault();
				this.setPayment('payment', 'Онлайн');
				this._buttonsPaymentOnline.classList.add('button_alt-active');
				this._buttonsPaymentOffline.classList.remove('button_alt-active');
			});
		}
	}


	switchActiveButton(clickedButton: HTMLButtonElement, otherButton: HTMLButtonElement) {
		clickedButton.classList.add('button_alt-active');
		otherButton.classList.remove('button_alt-active');
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			'';
	}

	protected setPayment(space: keyof MakingAnOrder, value: string) {
		this.events.emit('order.payment:change', {
			space,
			value,
		});
	}
}