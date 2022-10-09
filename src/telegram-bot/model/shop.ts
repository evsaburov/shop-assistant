import { PrismaClient, Shop } from '@prisma/client';
const prisma = new PrismaClient();

export const getShopsByCity = async (cityName: any): Promise<Shop[]> => {
	const shops = await prisma.shop.findMany({
		where: { city: cityName },
		distinct: ['name'],
	});

	return [...shops];
};
