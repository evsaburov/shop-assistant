export const hello = (user: string): string => {
	return `Привет, ${user}.\nДобро пожаловать в магазин обуви Sketchers`;
};

export const needDelivery = (): string => {
	return `Для начала, нужно установить адрес доставки магазина.`;
};

export const currentDelivery = (city: String, shop: string): string => {
	return `Адрес доставки: ${city} ${shop}`;
};

export const cardHello = (): string => {
	return `Карта лояльности позволяет получать скидки и участвовать в акциях, заполните указанные данные.`;
};

export const helpCommand = (): string => {
	return `Доступные команды:
/start - Запуск бота.
/catalog - Каталог магазина.
/delivery - Адрес доставки.
/card - Карта лояльности.
/help - Помощь.
/exit - Выход.`;
};
