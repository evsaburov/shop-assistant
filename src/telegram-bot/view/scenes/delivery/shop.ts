import { Shop } from '@prisma/client';

export function shopNotFound(): string {
	return 'Магазин не распознан, попробуйте выбрать еще раз';
}

export function isShopSelect(respondUser: string): string {
	return `Ваш магазин доставки ${respondUser}`;
}

export function selectShop(): string {
	return 'Выберете магазин в вашем городе';
}

export function shopsList(shops: Shop[]): string[] {
	return shops.map((el) => {
		return `${el.name} - ${el.street} ${el.home}`;
	});
}
