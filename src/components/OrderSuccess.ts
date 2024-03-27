import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';


interface IOrderSuccess {
	total: number;
}

interface IOrderSuccessActions {
	onClick: () => void;
}

export class OrderSuccess extends Component<IOrderSuccess> {
	protected _close: HTMLElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, actions: IOrderSuccessActions) {
		super(container);
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);
		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set total(total: number) {
		const message = `Списано ${total} синапсов`;
		this.setText(this._total, message);
	}
}
