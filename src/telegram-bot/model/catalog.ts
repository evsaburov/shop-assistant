import { Catalog, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCatalog = async (skip: number, take: number): Promise<Catalog[]> => {
	const result = await prisma.catalog.findMany({ skip, take });
	return result;
};

export const amountItemsInCatalog = async (): Promise<number> => {
	return await prisma.catalog.count();
};
