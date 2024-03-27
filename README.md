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
 baseUrl: string - используемый домен сервера.
 options: RequestInit - параметры запроса.
```
Методы:
```ts
 handleResponse(response: Response) - обрабатывает ответ сервера и возвращает либо полученные данные JSON, либо сообщение об ошибке.
 get(uri: string) - реализация метода GET для выполнения запроса на получение данных с сервера.
 post(uri: string, data: object, method: ApiPostMethods = 'POST') - реализация метода POST для передачи данных на сервер.

Конструктор:

constructor(baseUrl: string, options: RequestInit = {}) - конструктор класса, принимает базовый URL сервера и параметры запроса.
```
Все методы выполняют запросы с использованием fetch API и обрабатывают ответы сервера. Класс Api обеспечивает возможность выполнения запросов GET и POST к API сервера, а также обработку ответов сервера для получения данных или сообщений об ошибках.

## 2-Component<T>

Класс Component<T> представляет собой абстрактный класс для создания компонентов с определенным типом данных T. В конструктор класса Component<T> приходят следующие данные:

1. container: HTMLElement - элемент DOM, в который будет встроен компонент.
2. events: IEvents - интерфейс, определяющий возможные события компонента.

Класс Component<T> выполняет следующие функции:

Класс обеспечивает инструментарий для управления DOM-элементами и поведением компонента

Поля, методы и сеттеры класса Component<T>:
```ts
Поля:
 container (тип: HTMLElement) - элемент DOM, в который будет встроен компонент.
 events (тип: IEvents) - интерфейс событий компонента.

Методы:
 toggleClass(element: HTMLElement, className: string, force?: boolean) - переключает класс у элемента.
 setText(element: HTMLElement, value: unknown) - устанавливает текстовое содержимое элемента.
 setDisabled(element: HTMLElement, state: boolean) - изменяет статус блокировки элемента.
 setHidden(element: HTMLElement) - скрывает элемент.
 setVisible(element: HTMLElement) - отображает элемент.
 setImage(element: HTMLElement, src: string, alt?: string) - устанавливает изображение с альтернативным текстом.
 render(data?: Partial<T>): HTMLElement - возвращает корневой DOM-элемент компонента с применёнными данными.
```
Класс Component<T> служит для создания компонентов с определенным типом данных и предоставляет методы для работы с DOM-элементами и их состояниями.

## 3-EventEmitter

Базовый класс реализующий функции брокера событий.

Методы:

  - `on`, `off`, `emmit` - подписывают, снимают подписку и инициируют событие соответственно.
  - `onAll`, `ofAll` - подписывает на все события и сбрасывает все обработчики событий соответсвенно.
  - `trigger` - генерирует заданной событие с заданными аргументами. Позволяет передавать его в качестве обработчика события в другие классы, не зависящии напрямую от класса `EventEmmiter`.

## 4-Model

Базовый класс Model представляет собой абстрактную модель, которая используется для хранения данных и уведомления об изменениях. Конструктор класса принимает частичные данные типа T и объект событий IEvents.

Метод emitChanges используется для сообщения об изменениях в модели.

## Компоненты модели данных (бизнес-логика)

## 1-MainPage

Класс MainPage предназначен для управления состоянием главной страницы приложения, отображения выбранных продуктов в корзине, просмотра продукта, отображения всех категорий и отслеживания продуктов в корзине.
```ts
Поля класса MainPage:
 Поля класса:
 directory: ICartItem - список всех карточек на странице
 cart: ICartItem - выбранные продукты в корзине
 preview: ICartItem - модальное окно карточки

Методы класса:
 getFullPrice(): number - метод для вычисления полной стоимости заказа на основе выбранных продуктов в корзине
```

## 2-Product

Класс Product описывает отдельный лот товара.

В классе Product определены следующие свойства:
```ts
 id: string; - идентификатор лота;
 name: string; - название лота;
 price: number| null; - цена лота;
 description: string; - описание лота;
 image: string; - изображение лота;
 sector: LotSection[]; - название лотов
```
## 3-ProductWithCart

Класс ProductWithCart принимает следующие данные в конструкторе:
```ts
 id: string - идентификатор товара
 name: string - название товара
 price: number| null - цена товара
 description: string - описание товара
 image: string - ссылка на изображение товара
 sector: LotSection[] - сектор каждой карточки
 ```

Класс ProductWithCart предназначен для представления товара в корзине. Он объединяет свойства товара из интерфейса IProduct и методы изменения количества товара в корзине из интерфейса IProductAction.

Поля класса:
```ts
 id: string
 name: string
 price: number
 description: string
 image: string
 sector: LotSection[]
 ```

Методы класса:
```ts
 isAdded(): boolean - метод, который возвращает информацию о том, добавлен ли товар в корзину. Тип возвращаемого значения - boolean.
 add(id: string): void - метод для добавления товара в корзину по идентификатору
 remove(id: string): void - метод для удаления товара из корзины по идентификатору
 ```

Сеттеры класса:
Отсутствуют.

## 3-Order

В конструктор класса Order приходят следующие данные:
 ```ts
products: IProduct[]; - список продуктов, которые будут в заказе
totalPrice: number; - общая стоимость заказа
customer: ICustomer; - информация о клиенте (email, phone)
paymentMethod: PaymentMethod; - способ оплаты заказа (онлайн или при получении)
address: string; - адрес доставки заказа
 ```
Класс Order выполняет следующие функции:

Класс Order в интернет-магазине хранит информацию о продуктах, клиенте, оплате и доставке, проверяет данные клиента, завершает заказ и предоставляет данные для обработки и доставки.

## 4-ProductAction

Конструктор класса ProductAction должен включать следующие данные:
```ts
isAdded(): boolean - метод для проверки, добавлен ли товар в корзину. Возвращает булевое значение.

add(): void - метод для добавления товара в корзину. Не возвращает значения.

remove(): void - метод для удаления товара из корзины. Не возвращает значения.
```
Данные, которые обрабатывает класс ProductAction, относятся к функциям управления товарами в корзине покупок. Класс выполняет функции добавления и удаления товаров, а также проверяет, добавлен ли товар в корзину.

Тип данных, которые используются в конструкторе класса ProductAction, включают в себя методы, обрабатывающие товары и корзину, такие как boolean для проверки наличия товара в корзине.

## Компоненты представления

## 1-CustomerAddress

CustomerAddress:
Предоставляет информацию об адресе доставки и методе оплаты.
```ts
 Свойства:
  1.adress: string | number - адрес доставки (строка или число).
  2.payment: PaymentMethod - метод оплаты типа PaymentMethod. 
```
## 2-Customer

Customer:
Предоставляет информацию для выполнения заказа.
```ts
 Свойства:
  amail: string - адрес электронной почты заказчика.
  phone: string - номер телефона заказчика.
```

## 3-Cart

Конструктор класса Cart должен включать следующие данные:
```ts
products: IProduct[] - массив товаров, хранящихся в корзине. Каждый товар представлен интерфейсом IProduct, который содержит id, название, цену, описание, изображение и сектор лотов.
totalPrice: number - общая цена всех товаров в корзине.
```
Класс Cart предназначен для работы с корзиной покупок, хранения информации о добавленных товарах и общей сумме покупки. Методы, которые могут выполняться с классом Cart, могут включать добавление товаров в корзину, удаление товаров из корзины, расчет общей суммы покупки, создание заказа и загрузку данных о корзине через API.

Тип данных, которые используются в конструкторе класса Cart, включают массив товаров типа IProduct и число для хранения общей суммы цен товаров в корзине.

## 4-CartAction

Класс CartAction представляет собой интерфейс, который содержит методы для работы с корзиной покупок. В конструкторе класса CartAction требуется следующие данные:
```ts
 createOrder(): void - метод для создания заказа на основе данных, хранящихся в корзине.
 closeModal(): void - метод для закрытия модального окна или окна корзины.
 loadCart(): void - метод для загрузки данных о добавленных товарах в корзину через API.
```
Класс CartAction выполняет следующие функции:

Класс отвечает за управление действиями, связанными с корзиной покупок в интернет-магазине, такими как создание заказа, закрытие модального окна и загрузка данных о корзине через API.

## 5-FirstStageOrderModalAction

Интерфейс FirstStageOrderModalAction представляет интерфейс для заполнения способа оплаты и адреса доставки в модальном окне оформления заказа с методами:
```ts
selectPaymentMethod(paymentMethod: PaymentMethod): void;
setAddress(address: string): void;
  // проверяем корректность данных, если есть ошибки, то блокируем кнопку "Продолжить"
canMoveNextStage(): boolean;
  // Функция меняющая этап оформления заказа
nextStage(): void;.
```
## 6-SecondStageOrderModalAction

Класс SecondStageOrderModalAction предназначен для работы с данными о втором этапе оформления заказа. В конструктор этого класса приходят данные следующих типов:
```ts
isSuccessOrderCreated: boolean - флаг, указывающий успешно ли был оформлен заказ setCustomerInfo(customer: ICustomer): void - метод, который устанавливает информацию о заказчике (телефон и email)
isValid(): boolean - метод, который проверяет корректностьвведенных данных о заказчике
pay(): void - метод, который выполняет оплату и устанавливает флаг isSuccessOrderCreated в true
```
## 7-CartlogoModal

Интерфейс CartlogoModal представляет интерфейс для хранения списка товаров с методами:
```ts
setItems(items: IProduct): метод, который устанавливает переданный массив товаров в items после загрузки из API
getProduct(id: string): метод, который получает товар по его id из загруженного из API списка

объект с полями:
 items: массив объектов типа IProduct (интерфейс, описывающий товар)
```
## Ключевые типы данных
```ts
//описание карточки 
export interface IProduct {
	id: string;
	title: string;
	price: number | null;
	description: string;
	image: string;
	category: ProductCategory;
	button?: boolean;
}

//интерфейс главной страницы
export interface MainPage {
	directory: IProduct[]; //список всех карточек на странице
	basket: IProduct[];
	card: IProduct[]; //выбранные продукты в корзине
	preview: string | null; //модальное окно карточки
	delivery: IOrderCheckout | null;
	contact: ICustomer | null;
	order: IMakingAnOrder | null;
}

// оформление заказа
export interface IOrderEvent extends MakingAnOrder {
  list: ProductWithCart[];
  checkingTheAddress(): void;
  checkingThePhone(): void;
  checkingEmail(): void;
  completingTheOrder(): void;
}
```

```ts
//все события на сайте
export enum Events {
	LOAD_PRODUCTS = "product:load", //все категории карточек
	LOT_CHANGED = "lot:changed", //изменение в карточках товара
	CLICK_PRODUCT = "cart:open", //кликнули по карточке
	PRODUCT_OPEN = "product:open", //при клике на карточку открывается модальное окно
	PRODUCT_ADD_TO_CART = "product:add",//добавить продукт в корзину
	CLOSE_MODAL = "modal:close",//приклике на креситк закрывется модальное окно
	OPEN_CARD = "card:open",//открыти корзины
	DELETE_PRODUCT ="product:remove",//удалить продукт из корзины
	ORDER_CHECKOUT = "order:checkout",//переход к оформлению заказа
	ORDER_PAYMENT_METHOD = "order:payment",//способ оплаты и адрес
	ORDER_CHECKOUT_VALIDATE = "order-checkout:validate",// подтверждение, что форма заполнена верно
	ORDER_PAYMENT_VALIDATE = "order-payment:validate",// подтверждение, что форма c email и тел верно
	ORDER_COMPLETION = "contacts:submit",//заказ оформлен
}
```