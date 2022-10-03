export const hello = (user: string): string => {
	return `Привет, ${user}. Это магазин`;
};

export const needDelivery = (): string => {
	return `Для начала, нужно установить адрес доставки магазина.`;
};

export const currentDelivery = (city: String, shop: string): string => {
	return `Привет. Твой адрес доставки${city} ${shop}`;
};
