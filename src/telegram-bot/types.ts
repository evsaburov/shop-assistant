export enum KeyboardCommands {
	catalog = 'Каталог товаров',
	settings = 'Настройки',
	card = 'Карта лояльности',
}

export enum Status {
	BLOCKED = 'BLOCKED',
	ACTIVE = 'ACTIVE',
}

export enum Commands {
	HELP = 'help',
	SETTINGS = 'settings',
	CATALOG = 'catalog',
	DELIVERY = 'delivery',
	START = 'start',
	CARD = 'card',
	CART = 'cart',
	EXIT = 'exit',
}

export enum Hears {
	HELP = 'Помощь',
	SETTINGS = 'Настройки',
	CATALOG = 'Каталог',
	CART = 'Корзина',
	DELIVERY = 'Доставка',
	START = 'Старт',
	CARD = 'Карта лояльности',
	EXIT = 'Выход',
}

export enum Actions {
	DELIVERY_YES = 'setDeliveryYes',
	DELIVERY_NO = 'setDeliveryNo',
	CARD_YES = 'setCardYes',
	CARD_NO = 'setCardNo',
}

export type Card = {
	name: string;
	email: string;
	phone: string;
};

export type Delivery = {
	city: string;
	shop: string;
};

export type Cart = {
	shipmentId: number;
	size: number;
	color: string;
	price: number;
	name: String;
}[];

export type CartItem = {
	shipmentId: number;
	size: number;
	color: string;
	price: number;
	name: String;
};
