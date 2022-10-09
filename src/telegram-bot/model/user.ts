import { PrismaClient, Telegram, User } from '@prisma/client';
const prisma = new PrismaClient();

export const findChatById = async (id: number): Promise<Telegram | null> => {
	const telegramChat = await prisma.telegram.findUnique({
		where: { id: id },
	});
	return telegramChat;
};

export const createUser = async (): Promise<number> => {
	const createUser = await prisma.user.create({ data: {} });
	return createUser.id;
};

export const findUserById = async (id: number): Promise<User | null> => {
	const user = await prisma.user.findFirst({ where: { id: id } });
	return user;
};
