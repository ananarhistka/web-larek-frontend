import { Events, ICart, IFormErrors, IOrderEvent, IProduct, MainPage, MakingAnOrder, OrderEvent } from '../types';
import { Model } from './base/Model';
import { IEvents } from './base/events';
import { ProductItem } from './models/ProductItem';

//модель текущего состояния
export class AppState extends Model<MainPage> {
	basket: ICart;
	catalog: ProductItem[];
	order: IOrderEvent = new OrderEvent();
	preview: string | null;
	formErrors: IFormErrors = {};

	constructor(data: Partial<MainPage>, events: IEvents) {
		super(data, events);
		this.events = events;
	}

	setCatalog(items: IProduct[]) {
		this.catalog = items.map((item) => new ProductItem(item, this.events));
		this.emitChanges(Events.LOAD_PRODUCTS, { catalog: this.catalog });
	}

	setPreview(item: ProductItem): void {
		this.preview = item.id;
		this.emitChanges(Events.CLICK_PRODUCT, item);
	}

	addToBasket(item: ProductItem): void {
		this.catalog.map((el) => {
			if (item.id === el.id) {
				el.isOrdered = true;
			}
		});

		this.emitChanges(Events.LOT_CHANGED, item);
	}

	deleteFromBasket(item: ProductItem): void {
		this.catalog.map((el) => {
			if (item.id === el.id) {
				el.isOrdered = false;
			}
		});

		this.emitChanges(Events.LOT_CHANGED, item);
	}

	clearBasket(): void {
		this.catalog.forEach((el) => {
			el.isOrdered = false;
		});
		this.emitChanges(Events.LOT_CHANGED);
	}

	deleteFromTheBasket(item: ProductItem): void {
		this.catalog.map((el) => {
			if (item.id === el.id) {
				el.isOrdered = false;
			}
		});
		this.emitChanges(Events.LOT_CHANGED, item);
	}

	basketOnWheels(item: ProductItem): void {
		if (item.isOrdered) {
			this.deleteFromBasket(item);
		} else {
			this.addToBasket(item);
		}
		this.reCalcBasket();
	}

	private reCalcBasket(): void {
		const productsInBasket = this.catalog.filter((item) => item.isOrdered);
		this.basket = {
			totalPrice: productsInBasket.reduce((acc, item) => acc + item.price, 0),
			products: productsInBasket,
		};
	}

	getSelectedProducts = (): IProduct[] => this.catalog.filter((item) => item.isOrdered);

	getFull() {
		return this.catalog
			.filter((item) => item.isOrdered)
			.reduce((acc, el) => acc + el.price, 0);
	}

	setRequiredFieldToFillIn(field: keyof MakingAnOrder, value: string) {
		this.order[field] = value;

		this.events.emit(Events.ORDER_CHECKOUT_VALIDATE, {
			errorMsg: this.validateOrderCheckout()
		});

		this.events.emit(Events.ORDER_PAYMENT_VALIDATE, {
			errorMsg: this.validateOrderPersonalData()
		});
	}

	updatePaymentField(payment: 'cash' | 'online') {
		this.order.payment = payment;
	}

	validateOrderCheckout(): string | null {
		const errorMsg = [
			this.order.checkingTheAddress(),
			this.order.checkingThePaymentMethod()
		].filter(item => !!item);

		if (errorMsg.length > 0) {
			return errorMsg.join('; ');
		}

		return null;
	}

	validateOrderPersonalData() {
		const errorMsg = [
			this.order.checkingEmail(),
			this.order.checkingThePhone()
		].filter(item => !!item);

		if (errorMsg.length > 0) {
			return errorMsg.join('; ');
		}

		return null;
	}
}



