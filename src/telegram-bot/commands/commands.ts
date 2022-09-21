import { MyContext } from '../telegram-bot.interface';

export function start(this: any, ctx: MyContext): void {
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
