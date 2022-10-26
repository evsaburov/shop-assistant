import { Catalog, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCatalog = async (skip: number, take: number): Promise<Catalog[]> => {
	const result = await prisma.catalog.findMany({ skip, take });
	return result;
};

export const getMaxPage = async (): Promise<number> => {
	return await prisma.catalog.count();
};

export const getItemCatalogById = async (num: number): Promise<Catalog | null> => {
	return await prisma.catalog.findFirst({
		where: {
			id: num,
		},
	});
};
