import { PrismaClient } from '@prisma/client';
import { Card } from '../types';
const prisma = new PrismaClient();

export const createOrUpdateCard = async (data: Card, userId: number): Promise<void> => {
	const { name, phone, email } = data;
	const card = await prisma.card.upsert({
		where: { userId },
		update: { name, phone, email },
		create: { name, phone, email, userId },
	});
};
