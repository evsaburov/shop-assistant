export enum Button {
	CATALOG = 'Каталог',
	CARD = 'Карта лояльности',
	CART = 'Корзина',
	SETTINGS = 'Настройки',
	HELP = 'Помощь',
	EXIT = 'Выход',
	YES = 'Да',
	NO = 'Нет',
	TO_CART = 'В корзину',
	DELETE_FROM_CART = 'Удалить',
	PAY_FROM_CART = 'Оплатить',
}

export enum CallbackAction {
	DELIVERY_YES = 'setDeliveryYes',
	DELIVERY_NO = 'setDeliveryNo',
	CARD_YES = 'setCardYes',
	CARD_NO = 'setCardNo',
	ADD_FOR_CART = 'addForCart',
	ADD_TO_CART = 'addToCart',
}

export type kbInline = {
	reply_markup: {
		inline_keyboard: [{ text: string; callback_data: string }[]];
	};
};
