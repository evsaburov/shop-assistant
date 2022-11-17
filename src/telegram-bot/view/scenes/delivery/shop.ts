import { Shop } from '@prisma/client';

export const shopNotFound = '😞 Магазин не распознан, попробуйте выбрать еще раз';
export const selectShop = '🏬 Выберете магазин в вашем городе';

export function isShopSelect(respondUser: string): string {
	return `🏬 Ваш магазин доставки ${respondUser}`;
}

export function shopsList(shops: Shop[]): string[] {
	return shops.map((el) => {
		return `${el.name} - ${el.street} ${el.build}`;
	});
}
