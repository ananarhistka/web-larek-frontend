import { IEvents } from "./Events";

export abstract class Model<T> {
  constructor(data: Partial<T>, protected events: IEvents) {
    Object.assign(this, data);
  }

  //Сообщить что модель изменилась
  emitChanges(event: string, payload?: object) {
    this.events.emit(event, payload ?? {});
  }
}