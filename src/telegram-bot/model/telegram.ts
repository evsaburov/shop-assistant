import { PrismaClient, User, Telegram } from '@prisma/client';
const prisma = new PrismaClient();

type telegram = {
	id: number;
	first_name: string;
	username: string;
	is_bot: boolean;
	userId: number;
};

export const createTelegram = async (tgm: telegram): Promise<Telegram> => {
	const telegram = await prisma.telegram.create({
		data: {
			first_name: tgm.first_name,
			username: tgm.username,
			is_bot: tgm.is_bot,
			id: tgm.id,
			user: {
				connect: {
					id: tgm.userId,
				},
			},
		},
	});
	return telegram;
};

export const findUserByTelegramChatId = async (id: number): Promise<User | null> => {
	const telegram = await prisma.telegram.findFirst({
		where: { id: id },
		include: {
			user: true,
		},
	});
	const user = telegram?.user ? telegram.user : null;
	return user;
};
