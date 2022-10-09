import { MyContext } from '../telegram-bot.interface';
import { hello, currentDelivery, cardHello } from '../view/commands/commands';

export function start(ctx: MyContext): void {
	ctx.reply(hello(ctx.session.name));
	if (!ctx.session.city && !ctx.session.shop) {
		ctx.scene.enter('city');
	} else {
		ctx.reply(currentDelivery(ctx.session.city, ctx.session.shop));
	}
}

export function help(ctx: MyContext): void {
	ctx.sendMessage('help');
}

export function settings(ctx: MyContext): void {
	ctx.sendMessage('settings');
}

export function card(ctx: MyContext): void {
	ctx.sendMessage(cardHello());
	ctx.scene.enter('name');
}

export function exit(ctx: MyContext): void {
	ctx.scene.leave();
	start(ctx);
}

export function setDelivery(ctx: MyContext): void {
	ctx.sendMessage('Выбрать другой пункт выдачи?', {
		reply_markup: {
			inline_keyboard: [
				[
					{ text: 'Да', callback_data: 'setDeliveryYes' },
					{ text: 'Нет', callback_data: 'setDeliveryNo' },
				],
			],
		},
	});
}

export function phone(ctx: MyContext): void {
	ctx.scene.enter('phone');
}
