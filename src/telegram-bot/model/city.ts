import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCities = async (): Promise<string[]> => {
	const cities = await prisma.shop.findMany({
		where: {},
		distinct: ['city'],
	});
	return cities.map((el) => el.city);
};
