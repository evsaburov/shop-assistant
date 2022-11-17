import { Status } from '@prisma/client';
import { MyContext } from '../telegram-bot-interface';
import { findChatById, createUser } from '../model/user';
import { createTelegram, findUserByTelegramChatId } from '../model/telegram';

export const userController = async (ctx: MyContext): Promise<void> => {
	if (!ctx.from) throw new Error('не удалось получить from из контекста');
	if (!ctx.from.first_name) throw new Error('не удалось получить first_name пользователя');
	if (!ctx.from.username) throw new Error('не удалось получить username пользователя');
	if (!ctx.from.id) throw new Error('не удалось получить chat id пользователя');
	if (ctx.from.is_bot === undefined) throw new Error('не удалось получить is_bot пользователя');
	let chat = await findChatById(ctx.from.id);

	if (!chat) {
		const userId = await createUser();
		const telegram = {
			id: ctx.from.id,
			first_name: String(ctx.from.first_name),
			username: String(ctx.from.username),
			is_bot: Boolean(ctx.from.is_bot),
			userId: userId,
		};
		chat = await createTelegram(telegram);
	}
	const user = await findUserByTelegramChatId(ctx.from.id);
	ctx.session.user = chat.userId;

	if (user === null) throw new Error('не удалось определить пользователя');
	if (chat === null) throw new Error('не удалось определить чат');
	if (user.status === Status.BLOCKED) ctx.sendMessage('Пользователь заблокирован.');

	if (!ctx.session.chat) ctx.session.chat = chat.id;
	if (!ctx.session.name) ctx.session.name = chat.first_name;
	if (!ctx.session.cart) ctx.session.cart = [];
};
