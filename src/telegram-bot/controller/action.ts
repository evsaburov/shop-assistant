import { callback } from 'telegraf/typings/button';
import { MyContext } from '../telegram-bot.interface';
import { hello, currentDelivery } from '../view/commands/commands';

export const actionSetDeliveryYes = (ctx: MyContext): void => {
	ctx.answerCbQuery();
	ctx.scene.enter('city');
};
export const actionSetDeliveryNo = (ctx: MyContext): void => {
	ctx.answerCbQuery();
	ctx.reply('Вы отказались от смены доставки');
};
