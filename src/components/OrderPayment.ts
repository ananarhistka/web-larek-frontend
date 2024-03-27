import { ICustomer } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class OrderPayment extends Form<ICustomer> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value = value || null;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value = value || null;
	}
}
