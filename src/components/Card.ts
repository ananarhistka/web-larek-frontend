import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IProduct } from '../types'

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
  protected _id: HTMLElement;
  protected _name: HTMLElement;
  protected _price?: HTMLElement;
  protected _description?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _sector?: HTMLElement;
  protected _button?: HTMLButtonElement;

  constructor(
    protected blockName: string,
    protected container: HTMLElement,
    actions?: ICardActions
  ) {
    super(container);

    this._name = ensureElement<HTMLElement>(`.${blockName}__name`, container);
    this._price = container.querySelector(`.${blockName}__price`);
    this._description = container.querySelector(`.${blockName}__text`);
    this._image = ensureElement<HTMLImageElement>(
      `.${blockName}__image`,
      container
    );
    this._button = container.querySelector(`.${blockName}__button`);

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }
  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id(): string {
    return this.container.dataset.id || '';
  }

  set price(value: string) {
    if (value == null) {
      this.setText(this._price, 'Бесценно');
    } else {
      this.setText(this._price, value + 'синапсов');
    }
  }

  get price(): string {
    return this._price.textContent || '';
  }

  set sector(value: string) {
    const sectorElement = this.container.querySelector(
      `.${this.blockName}__category`
    );

    sectorElement.textContent = value;

    let sectorValue = '';

    switch (value) {
      case 'софт-скил':
        sectorValue = 'soft';
        break;
      case 'другое':
        sectorValue = 'other';
        break;
      case 'кнопка':
        sectorValue = 'button';
        break;
      case 'хард-скил':
        sectorValue = 'hard';
        break;
      case 'дополнительное':
        sectorValue = 'additional';
        break;
      default:
        sectorValue = '';
        break;
    }
    sectorElement.classList.add(
      `${this.blockName}__sector_${sectorValue}`
    );
  }

  get sector(): string {
    return this._sector.textContent || '';
  }

  set name(value: string) {
    this.setText(this._name, value);
  }

  get name(): string {
    return this._name.textContent || '';
  }

  set image(value: string) {
    this.setImage(this._image, value, this.name);
  }

  set description(value: string) {
    this.setText(this._description, value);
  }
}

export class Auction extends Card {
  protected _status: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);
  }

  set button(value: boolean) {
    const price = this._price.innerText;

    if (price === 'Бесценно') {
      this._button.disabled = true;
    } else {
      this._button.disabled = false;
    }

    this.setText(this._button, value ? 'Удалить' : 'В корзину');
  }

  set description(value: string) {
    this.setText(this._description, value);
  }
}
