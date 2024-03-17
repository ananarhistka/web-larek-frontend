# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Базовый код

## Об архитектуре 

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.
м

## 1-Класс Api

Класс Api представляет собой базовый класс для работы с API сервера. Он содержит следующие поля, методы и сеттеры:

Поля:
```ts
1. baseUrl: string - используемый домен сервера.
2. options: RequestInit - параметры запроса.
```
Методы:
```ts
1. constructor(baseUrl: string, options: RequestInit = {}) - конструктор класса, принимает базовый URL сервера и параметры запроса.
2. handleResponse(response: Response) - обрабатывает ответ сервера и возвращает либо полученные данные JSON, либо сообщение об ошибке.
3. get(uri: string) - реализация метода GET для выполнения запроса на получение данных с сервера.
4. post(uri: string, data: object, method: ApiPostMethods = 'POST') - реализация метода POST для передачи данных на сервер.
```
Все методы выполняют запросы с использованием fetch API и обрабатывают ответы сервера. Класс Api обеспечивает возможность выполнения запросов GET и POST к API сервера, а также обработку ответов сервера для получения данных или сообщений об ошибках.

## 2-Component<T>

Класс Component<T> представляет собой абстрактный класс для создания компонентов с определенным типом данных T. В конструктор класса Component<T> приходят следующие данные:

1. container: HTMLElement - элемент DOM, в который будет встроен компонент.
2. events: IEvents - интерфейс, определяющий возможные события компонента.
```ts
Класс Component<T> выполняет следующие функции:

1. toggleClass(element: HTMLElement, className: string, force?: boolean) - переключение класса у элемента.
2. setText(element: HTMLElement, value: unknown) - установка текстового содержимого элемента.
3. setDisabled(element: HTMLElement, state: boolean) - изменение статуса блокировки элемента.
4. setHidden(element: HTMLElement) - скрытие элемента.
5. setVisible(element: HTMLElement) - отображение элемента.
6. setImage(element: HTMLElement, src: string, alt?: string) - установка изображения с альтернативным текстом.
7. render(data?: Partial<T>): HTMLElement - возвращает корневой DOM-элемент компонента, применяя частичные данные для рендеринга.
```
Поля, методы и сеттеры класса Component<T>:
```ts
Поля:
1. container (тип: HTMLElement) - элемент DOM, в который будет встроен компонент.
2. events (тип: IEvents) - интерфейс событий компонента.

Методы:
1. toggleClass(element: HTMLElement, className: string, force?: boolean) - переключает класс у элемента.
2. setText(element: HTMLElement, value: unknown) - устанавливает текстовое содержимое элемента.
3. setDisabled(element: HTMLElement, state: boolean) - изменяет статус блокировки элемента.
4. setHidden(element: HTMLElement) - скрывает элемент.
5. setVisible(element: HTMLElement) - отображает элемент.
6. setImage(element: HTMLElement, src: string, alt?: string) - устанавливает изображение с альтернативным текстом.
7. render(data?: Partial<T>): HTMLElement - возвращает корневой DOM-элемент компонента с применёнными данными.
```
Класс Component<T> служит для создания компонентов с определенным типом данных и предоставляет методы для работы с DOM-элементами и их состояниями.

## 3-EventEmitter

EventEmitter класс, который представляет собой реализацию брокера событий с возможностью подписки на события, отписки от событий и генерации событий.

Класс представляет собой методы для установки обработчика на событие (on), инициирования события с данными (emit), слушания всех событий (onAll), сброса всех обработчиков (offAll) и создания триггера для генерации события при вызове (trigger).

## 4-Model

Базовый класс Model представляет собой абстрактную модель, которая используется для хранения данных и уведомления об изменениях. Конструктор класса принимает частичные данные типа T и объект событий IEvents.

Метод emitChanges используется для сообщения об изменениях в модели.

## Компоненты модели данных (бизнес-логика)

## 1-MainPage

Класс MainPage принимает данные следующего типа в конструкторе:
``` ts
constructor(data: Partial<MainPage>, events: IEvents) {}
```
Где data представляет частичные данные типа MainPage, а events представляет объект событий типа IEvents.

Класс MainPage предназначен для управления состоянием главной страницы приложения, отображения выбранных продуктов в корзине, просмотра продукта, отображения всех категорий и отслеживания продуктов в корзине.
```ts
Поля класса MainPage:
1. cart: CartItem - выбранные продукты в корзине
2. preview: CartItem - просматриваемый продукт
3. directory: CartItem - все категории
4. orderProducr: Cart - отслеживание продуктов в корзине

Методы класса MainPage:
1. setCart(items: CartItem): void - устанавливает выбранные продукты в корзине
2. getCart(): CartItem - возвращает выбранные продукты в корзине
3. setPreview(item: CartItem): void - устанавливает просматриваемый продукт
4. getPreview(): CartItem - возвращает просматриваемый продукт
5. setDirectory(items: CartItem): void - устанавливает все категории
6. getDirectory(): CartItem - возвращает все категории
7. setOrderProduct(order: Cart): void - устанавливает отслеживаемые продукты в корзине
8. getOrderProduct(): Cart - возвращает отслеживаемые продукты в корзине
```
Типы данных:
- CartItem - интерфейс, представляющий данные о продуктах в корзине с учетом категории и общей цены
- Cart - интерфейс, представляющий данные о заказе продуктов

Класс MainPage выполняет функции управления состоянием главной страницы приложения, отображения информации о продуктах в корзине, просмотра выбранного продукта, отображения категорий и отслеживания продуктов в корзине.

## 2-CardProduct

Класс CardProduct описывает отдельный лот товара.

В классе CartProduct определены следующие свойства:

- id: идентификатор лота;
- name: название лота;
- price: цена лота;
- description: описание лота;
- image: изображение лота;

## 3-CartItem

Класс CartItem представляет собой комбинированный объект, который объединяет данные о продукте (Product) и информацию о корзине (Cart).

Поля класса CartItem:
1. products: массив объектов типа CardProduct - карточка товара
2. category: строковое значение из перечисления типов LotSection - категория продуктов в корзине
3. totalPrice: число - общая цена продуктов в корзине
```ts
Методы и сеттеры класса CartItem:
1. getProducts(): CardProduct - возвращает массив продуктов в корзине
2. getCategory(): LotSection - возвращает категорию продуктов
3. getTotalPrice(): number - возвращает общую цену продуктов в корзине
4. setProducts(products: CardProduct): void - устанавливает продукты в корзине
5. setCategory(category: LotSection): void - устанавливает категорию продуктов
6. setTotalPrice(totalPrice: number): void - устанавливает общую цену продуктов в корзине
```
Методы и сеттеры класса CartItem:
Отсутствуют, так как CartItem представляет собой комбинированный объект, а не класс с методами и сеттерами.

Тип данных:
- CartItem - комбинированный тип данных, содержащий информацию о продукте (Product) и корзине (Cart)

## Компоненты представления

## 1 Cart

Cart:
Представляет информацию о содержимом корзины.

 Свойства:
 ```ts
  1.products: CardProduct[] - массив продуктов типа CartProduct.
  2.totalPrice: number - общая стоимость продуктов в корзине.
```
## 2 DeliveryAddress

DeliveryAddress:
Предоставляет информацию об адресе доставки и методе оплаты.
```ts
 Свойства:
  1.adress: string | number - адрес доставки (строка или число).
  2.payment: PaymentMethod - метод оплаты типа PaymentMethod. 
```
## 3 MakingAnOrder

MakingAnOrder:
Предоставляет информацию для выполнения заказа.
```ts
 Свойства:
  1.amail: string - адрес электронной почты заказчика.
  2.phone: string - номер телефона заказчика.
```
## Ключевые типы данных
//карточки на главной странице
```ts
interface Product {
  products: CartProduct[];//описание карточек
  category: LotSection;//категории
}
```
```ts

//описание карточки 
interface CartProduct {
   id: number;//id карточки
   name: string;//имя карточки
   price: number;//цена карточки 
   description: string;//описание 
   image: string;//путь к изображению
}

interface MainPage {
   cart: CartItem[]; //выбранные продукты в корзине
   preview: CartItem; //просмотр продукта
   directory: CartItem[]; //все категории
   orderProducr: Cart;//отслеживание продуктов в корзине
}
```

```ts
//все события на сайте
enum Events {
      CATALOG_PRODUCTS = "product:changed", //все категории карточек
      HOVER_PRODUCTS = "product:hover",//навели на карточку
      CLICK_PRODUCTS = "card:open", //кликнули по карточке
      OPEN_MODAL = "modal:open", //при клике на карточку открывается модальное окно
      CLOSE_MODAL = "modal:close",//приклике на креситк закрывется модальное окно
      CHANGING_PRODUCT_CART = "cart:changed",//добавить продукт в корзину
      OPEN_CART = "cart:open",//открыти корзины
      MAKING_AN_ORDER = "making-order:open",//переход к оформлению заказа
      PAYMENT_METHOD = "payment:changed",//способ оплаты
      FILLING_IN_FIELDS_WHITH_DATE = "data-field:changed",//заполняем поля данными 
      ORDER_COMPLETION = "order-completion:post",//заказ оформлен
}
```