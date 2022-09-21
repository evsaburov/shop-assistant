import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cities = [
	{ name: 'Челябинск' },
	{ name: 'Златоуст' },
	{ name: 'Озерск' },
	{ name: 'Снежинск' },
	{ name: 'Магнитогорск' },
	{ name: 'Миасс' },
	{ name: 'Чебаркуль' },
];

const shops = [
	{ name: 'Магазин 1', cityId: 1, street: 'пл. Революции', home: '1' },
	{ name: 'Магазин 2', cityId: 1, street: 'пр-кт Ленина', home: '5' },
	{ name: 'Магазин 3', cityId: 2, street: 'пр-кт Свердловский', home: '3' },
	{ name: 'Магазин 4', cityId: 2, street: '	ул. Сони Кривой', home: '5' },
	{ name: 'Магазин 5', cityId: 2, street: 'ул. Труда', home: '2' },
	{ name: 'Магазин 6', cityId: 3, street: 'ул. Худякова', home: '4' },
	{ name: 'Магазин 7', cityId: 3, street: 'ул. Воровского', home: '5' },
	{ name: 'Магазин 8', cityId: 3, street: 'ул. Комарова', home: '4' },
	{ name: 'Магазин 9', cityId: 4, street: 'ул. Салютная', home: '7' },
	{ name: 'Магазин 10', cityId: 4, street: 'ул. Мамина', home: '3' },
	{ name: 'Магазин 11', cityId: 5, street: 'пл. Революции', home: '4' },
	{ name: 'Магазин 12', cityId: 5, street: 'ул. Елькина', home: '6' },
	{ name: 'Магазин 13', cityId: 5, street: 'ул. Воровского', home: '7' },
	{ name: 'Магазин 14', cityId: 6, street: 'ул. Блюхера', home: '9' },
	{ name: 'Магазин 15', cityId: 7, street: 'ул. Дарвина', home: '3' },
	{ name: 'Магазин 16', cityId: 7, street: 'ул. Румянцева', home: '3' },
	{ name: 'Магазин 17', cityId: 7, street: 'ул. Гагарина', home: '3' },
];

async function addcityId(): Promise<void> {
	prisma.$connect();
	try {
		const createCities = await prisma.city.createMany({ data: cities });
	} catch (error) {
		console.log(error);
	}
	prisma.$disconnect();
}

async function addAddressShop(): Promise<void> {
	prisma.$connect();
	try {
		const createShopAddress = await prisma.shop.createMany({ data: shops });
	} catch (error) {
		console.log(error);
	}
	prisma.$disconnect();
}

addcityId();
addAddressShop();
