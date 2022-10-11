import { MyContext } from '../telegram-bot-interface';

export const actionSetDeliveryYes = (ctx: MyContext): void => {
	ctx.answerCbQuery();
	ctx.scene.enter('city');
};
export const actionSetDeliveryNo = (ctx: MyContext): void => {
	ctx.answerCbQuery();
	ctx.reply('Вы отказались от смены доставки');
};
