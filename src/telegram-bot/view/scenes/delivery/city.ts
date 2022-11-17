export const cityNotFound = '😞 Город не распознан, попробуйте выбрать еще раз';
export const selectCity = '🏙️ Выберете Ваш город из списка';

export function isCitySet(respondUser: string): string {
	return `🚚 Ваш город доставки ${respondUser}`;
}
