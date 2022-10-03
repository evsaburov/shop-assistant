import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cities = [
	{ id: 1, name: 'Челябинск' },
	{ id: 2, name: 'Златоуст' },
	{ id: 3, name: 'Озерск' },
	{ id: 4, name: 'Снежинск' },
	{ id: 5, name: 'Магнитогорск' },
	{ id: 6, name: 'Миасс' },
	{ id: 7, name: 'Чебаркуль' },
];

const shops = [
	{ id: 1, name: 'Магазин 1', cityId: 1, street: 'пл. Революции', home: '1' },
	{ id: 2, name: 'Магазин 2', cityId: 1, street: 'пр-кт Ленина', home: '5' },
	{ id: 3, name: 'Магазин 3', cityId: 2, street: 'пр-кт Свердловский', home: '3' },
	{ id: 4, name: 'Магазин 4', cityId: 2, street: 'ул. Сони Кривой', home: '5' },
	{ id: 5, name: 'Магазин 5', cityId: 2, street: 'ул. Труда', home: '2' },
	{ id: 6, name: 'Магазин 6', cityId: 3, street: 'ул. Худякова', home: '4' },
	{ id: 7, name: 'Магазин 7', cityId: 3, street: 'ул. Воровского', home: '5' },
	{ id: 8, name: 'Магазин 8', cityId: 3, street: 'ул. Комарова', home: '4' },
	{ id: 9, name: 'Магазин 9', cityId: 4, street: 'ул. Салютная', home: '7' },
	{ id: 10, name: 'Магазин 10', cityId: 4, street: 'ул. Мамина', home: '3' },
	{ id: 11, name: 'Магазин 11', cityId: 5, street: 'пл. Революции', home: '4' },
	{ id: 12, name: 'Магазин 12', cityId: 5, street: 'ул. Елкина', home: '6' },
	{ id: 13, name: 'Магазин 13', cityId: 5, street: 'ул. Воровского', home: '7' },
	{ id: 14, name: 'Магазин 14', cityId: 6, street: 'ул. Блюхера', home: '9' },
	{ id: 15, name: 'Магазин 15', cityId: 7, street: 'ул. Дарвина', home: '3' },
	{ id: 16, name: 'Магазин 16', cityId: 7, street: 'ул. Румянцева', home: '3' },
	{ id: 17, name: 'Магазин 17', cityId: 7, street: 'ул. Гагарина', home: '3' },
];

async function main(): Promise<void> {
	prisma.$connect();
	console.log(`Start seeding ...`);
	for (const city of cities) {
		const cityUpsert = await prisma.city.upsert({
			where: { id: city.id },
			update: { name: city.name },
			create: { name: city.name },
		});
		console.log(`Upsert city with id: ${cityUpsert.id}`);
	}
	for (const shop of shops) {
		const shopUpsert = await prisma.shop.upsert({
			where: { id: shop.id },
			update: { name: shop.name },
			create: { name: shop.name, street: shop.street, home: shop.home },
		});
		console.log(`Upsert shop with id: ${shopUpsert.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
