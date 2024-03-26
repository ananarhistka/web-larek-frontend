import {
	IFormErrors,
	MainPage,
	ProductWithCart,
	IOrderEvent,
	MakingAnOrder,
	OrdetEvent,
	ProductCategory,
	IProduct, Events, ICart,
} from '../types';
import { Model } from "./base/Model";
import { IEvents } from './base/events';

export type CatalogChangeEvent = {
	catalog: ProductWithCart[];
};

//модель элемента лота
export class ProductItem extends Model<ProductWithCart> {
	id: string;
	title: string;
	about: string;
	description: string;
	image: string;
	price: number | null;
	isOrdered: boolean;
	category: ProductCategory;
	status: IOrderEvent;
}

//модель текущего состояния
export class AppState extends Model<MainPage> {
	basket: ICart;
	catalog: ProductItem[];
	order: IOrderEvent = new OrdetEvent();
	preview: string | null;
	formErrors: IFormErrors = {};

	constructor(data: Partial<MainPage>, events: IEvents) {
		super(data, events);
		this.events = events;
	}

	setCatalog(items: IProduct[]) {
		this.catalog = items.map((item) => new ProductItem(item, this.events));
		this.emitChanges(Events.CATALOG_PRODUCTS, { catalog: this.catalog });
	}

	setPreview(item: ProductItem): void {
		this.preview = item.id;
		this.emitChanges(Events.CLICK_PRODUCTS, item);
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
		}
	}
	getSelectedProducts = (): IProduct[] => this.catalog.filter((item) => item.isOrdered);

	getFull() {
		return this.catalog
			.filter((item) => item.isOrdered)
			.reduce((acc, el) => acc + el.price, 0);
	}
	setRequiredFieldToFillIn(field: keyof MakingAnOrder, value: string) {
		this.order[field] = value;

		if (this.validateOrderAddressPayment()) {
			this.events.emit('order:ready', this.order);
		}

		if (this.validateOrderData()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrderAddressPayment() {
		const errors: typeof this.formErrors = {};

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	validateOrderData() {
		const errors: typeof this.formErrors = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.formErrors = errors;
		this.events.emit('formErrorsContact:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}
}



