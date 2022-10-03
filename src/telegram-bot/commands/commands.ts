import { MyContext } from '../telegram-bot.interface';
import { hello, needDelivery, currentDelivery } from '../view/commands/commands';

export function start(ctx: MyContext): void {
	// const currentUser =
	// ctx.reply(hello(currentUser));
	// if (hasCityOrShop(ctx)) {
	// 	ctx.reply(needDelivery());
	// 	ctx.scene.enter('city');
	// } else {
	// 	ctx.reply(currentDelivery(ctx.session.city, ctx.session.shop));
	// }
	ctx.sendMessage('start');
}

export function help(ctx: MyContext): void {
	ctx.sendMessage('help');
}

export function settings(ctx: MyContext): void {
	ctx.sendMessage('settings');
}

export function card(ctx: MyContext): void {
	ctx.sendMessage('card');
}

export function test(ctx: MyContext): void {
	ctx.sendMessage('test');
}

function hasCityOrShop(ctx: MyContext): boolean {
	return !ctx.session.city && !ctx.session.shop;
}
