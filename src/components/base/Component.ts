
export abstract class Component<T> {

  protected constructor(
    protected readonly container: HTMLElement) {
  }

  // Переключить класс
  toggleClass(element: HTMLElement, className: string, force?: boolean) {
    element.classList.toggle(className, force);
  }

  // Установить текстовое содержимое
  protected setText(element: HTMLElement, value: unknown): void {
    if (element) {
      element.textContent = value ? String(value): null;
    }
  }

  // Сменить статус блокировки
  setDisabled(element: HTMLElement, state: boolean): void {
    if (element) {
      if (state) element.setAttribute('disabled', 'disabled');
      else element.removeAttribute('disabled');
    }
  }

  // Скрыть элемент
  protected setHidden(element: HTMLElement) {
    element.style.display = 'none';
  }

  // Показать элемент
  protected setVisible(element: HTMLElement) {
    element.style.removeProperty('display');
  }

  // Установить изображение с алтернативным текстом
  protected setImage(element: HTMLImageElement, src: string, alt?: string) {
    if (element) {
      element.src = src;
      if (alt) {
        element.alt = alt;
      }
    }
  }

  // Вернуть корневой DOM-элемент
  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}
