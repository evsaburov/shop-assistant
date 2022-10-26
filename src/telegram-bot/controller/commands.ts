import {
	deleteFromCartKeyboard,
	mainKeyboard,
	payItemToCartKeyboard,
	setCardKeyboard,
	setDeliveryKeyboard,
} from '../keyboards/keyboards';
import { Scene } from '../scene/types';
import { MyContext } from '../telegram-bot-interface';
import {
	hello,
	cardHello,
	helpCommand,
	cartHello,
	emptyCart,
	itemDescription,
} from '../view/commands/commands';
import { actionSendItemCatalog } from './action';

export async function start(ctx: MyContext): Promise<void> {
	ctx.reply(hello(ctx.session.name), mainKeyboard);
	!ctx.session.city && !ctx.session.shop ? ctx.scene.enter(Scene.CITY) : catalog(ctx);
}

export async function catalog(ctx: MyContext): Promise<void> {
	actionSendItemCatalog(ctx, 'cat-1');
}

export function help(ctx: MyContext): void {
	ctx.sendMessage(helpCommand());
}

export function card(ctx: MyContext): void {
	ctx.sendMessage(cardHello, setCardKeyboard);
}

export const cart = async (ctx: MyContext): Promise<void> => {
	if (ctx.session.cart.length === 0) {
		ctx.sendMessage(emptyCart);
		return;
	}
	await ctx.sendMessage(cartHello);
	const cart = ctx.session.cart;

	for (const item of cart) {
		await ctx.replyWithHTML(itemDescription(item), deleteFromCartKeyboard(item.shipmentId));
	}

	const mapPrice = cart.map((el) => el.price);
	const totalPrice = mapPrice.reduce((acc, curVal): number => acc + curVal);
	ctx.reply(`🛒 Всего к отплате: ${totalPrice} р.`, payItemToCartKeyboard);
};

export function exit(ctx: MyContext): void {
	ctx.scene.leave();
	start(ctx);
}

export function delivery(ctx: MyContext): void {
	ctx.sendMessage('Выбрать другой пункт выдачи?', setDeliveryKeyboard);
}
