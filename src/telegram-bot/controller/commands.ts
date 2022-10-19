import {
	mainKeyboard,
	setCardKeyboard,
	setDeliveryKeyboard,
	getPaginationKb,
} from '../keyboards/keyboards';
import { amountItemsInCatalog } from '../model/catalog';
import { Scene } from '../scene/types';
import { MyContext } from '../telegram-bot-interface';
import { hello, cardHello, helpCommand, cartHello } from '../view/commands/commands';
import { actionSendItemCatalog } from './action';

export async function start(ctx: MyContext): Promise<void> {
	ctx.reply(hello(ctx.session.name), mainKeyboard);
	if (!ctx.session.city && !ctx.session.shop) ctx.scene.enter(Scene.CITY);
}

export async function catalog(ctx: MyContext): Promise<void> {
	const amountItems = await amountItemsInCatalog();
	// ctx.sendMessage(`картинка товара с описанием`, getPaginationKb(1, amountItems));
	actionSendItemCatalog(ctx, 'cat-1');
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

export function cart(ctx: MyContext): void {
	ctx.sendMessage(cartHello());
}

export function exit(ctx: MyContext): void {
	ctx.scene.leave();
	start(ctx);
}

export function delivery(ctx: MyContext): void {
	ctx.sendMessage('Выбрать другой пункт выдачи?', setDeliveryKeyboard);
}
