import { MyContext } from '../telegram-bot.interface';

export const userController = (ctx: MyContext): void => {
	const update = JSON.parse(JSON.stringify(ctx.update));
	const UserContext = update.message.from;
	console.log(UserContext);
};
