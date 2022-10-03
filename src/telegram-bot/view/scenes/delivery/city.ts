export function cityNotFound(): string {
	return 'Город не распознан, попробуйте выбрать еще раз';
}

export function selectCity(): string {
	return 'Выберете Ваш город из списка';
}

export function isCitySet(respondUser: string): string {
	return `Ваш город доставки ${respondUser}`;
}
