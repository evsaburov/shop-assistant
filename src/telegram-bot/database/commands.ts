import { PrismaClient, Shop } from '@prisma/client';
const prisma = new PrismaClient();

export const getCities = async (): Promise<string[]> => {
	const cities = await prisma.city.findMany({
		where: {},
		distinct: ['name'],
	});
	return cities.map((el) => el.name);
};

export const getShopsByCity = async (cityName: any): Promise<Shop[]> => {
	const city = await prisma.city.findFirst({
		where: { name: cityName },
	});

	const shops = await prisma.shop.findMany({
		where: { cityId: city?.id },
		distinct: ['name'],
	});

	return [...shops];
};
