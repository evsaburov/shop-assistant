import { CartItem } from '../../types';

export const hello = (user: string): string => {
	return `Привет, ${user}.\nДобро пожаловать в магазин обуви Sketchers`;
};

export const needDelivery = `Для начала, нужно установить адрес доставки магазина.`;
export const currentDelivery = (city: String, shop: string): string => {
	return `📋 Адрес доставки: ${city} ${shop}`;
};

export const itemDescription = (item: CartItem): string => {
	return `🧾 Наименование: ${item.name}\n\nЦвет: ${item.color}\nРазмер: ${item.size}\nЦена: ${item.price}`;
};

export const cardHello = `💳 Карта лояльности позволяет получать скидки и участвовать в акциях, заполните указанные данные.`;
export const cartHello = `🛍️ Содержимое Вашей корзины:`;
export const emptyCart = `🥛 У Вас пустая корзина`;

export const helpCommand = (): string => {
	return `Доступные команды:
/start - Запуск бота.
/catalog - Каталог магазина.
/delivery - Адрес доставки.
/cart - Корзина.
/card - Карта лояльности.
/help - Помощь.
/exit - Выход.`;
};
