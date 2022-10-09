import { MyContext } from '../telegram-bot.interface';
import {
	findChatById,
	createUser,
	createTelegram,
	findUserByTelegramChatId,
} from '../model/models';

export const userController = async (ctx: MyContext): Promise<void> => {
	const from = JSON.parse(JSON.stringify(ctx.from));
	const chatId = Number(from.id);
	let chat = await findChatById(chatId);

	if (!chat) {
		const userId = await createUser();
		const telegram = {
			id: chatId,
			first_name: String(from.first_name),
			username: String(from.username),
			is_bot: Boolean(from.is_bot),
			userId: userId,
		};
		chat = await createTelegram(telegram);
	}
	const user = await findUserByTelegramChatId(chatId);
	ctx.session.user = chat.userId;

	if (user === null) throw new Error('не удалось определить пользователя');
	if (chat === null) throw new Error('не удалось определить чат');
	if (user.status === 'BLOCKED') ctx.sendMessage('Пользователь заблокированы');

	if (!ctx.session.chat) ctx.session.chat = chat.id;
	if (!ctx.session.name) ctx.session.name = chat.first_name;
};
