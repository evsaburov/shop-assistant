import { PrismaClient, Store } from '@prisma/client';
const prisma = new PrismaClient();

export const getItemStoreByCatalogId = async (num: number): Promise<Store[]> => {
	return await prisma.store.findMany({ where: { catalogId: num } });
};

export const getItemStoreById = async (num: number): Promise<Store | null> => {
	return await prisma.store.findFirst({
		where: {
			id: num,
		},
		include: {
			catalog: true,
		},
	});
};
