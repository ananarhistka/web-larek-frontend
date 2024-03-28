import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IProduct } from '../types'

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class ProductCard extends Component<IProduct> {
  protected _id: HTMLElement;
  protected _title: HTMLElement;
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

    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
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
    const sectorElement = this.container.querySelector(`.${this.blockName}__category`) as HTMLElement | null;

    if (sectorElement) {
      this.setText(sectorElement, value);

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
      sectorElement.setAttribute('class', `${this.blockName}__sector_${sectorValue}`);
    }
  }

  get sector(): string {
    return this._sector.textContent || '';
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  get title(): string {
    return this._title.textContent || '';
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  set description(value: string) {
    this.setText(this._description, value);
  }
}

export class ActionItem extends ProductCard {
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