import { mainKeyboard, setCardKeyboard, setDeliveryKeyboard } from '../keyboards/keyboards';
import { Scene } from '../scene/types';
import { MyContext } from '../telegram-bot-interface';
import { hello, cardHello, helpCommand } from '../view/commands/commands';

export function start(ctx: MyContext): void {
	ctx.reply(hello(ctx.session.name), mainKeyboard);
	if (!ctx.session.city && !ctx.session.shop) ctx.scene.enter(Scene.CITY);
}

export function catalog(ctx: MyContext): void {
	// ctx.reply(hello(ctx.session.name), mainKeyboard);
	// if (!ctx.session.city && !ctx.session.shop) ctx.scene.enter(Scene.CITY);
	ctx.reply('catalog');
}

export function help(ctx: MyContext): void {
	ctx.sendMessage(helpCommand());
}

export function settings(ctx: MyContext): void {
	ctx.sendMessage('settings');
}

export function card(ctx: MyContext): void {
	ctx.sendMessage(cardHello(), setCardKeyboard);
}

export function exit(ctx: MyContext): void {
	ctx.scene.leave();
	start(ctx);
}

export function delivery(ctx: MyContext): void {
	ctx.sendMessage('Выбрать другой пункт выдачи?', setDeliveryKeyboard);
}
