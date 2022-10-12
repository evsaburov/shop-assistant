import { Scene } from '../scene/types';
import { MyContext } from '../telegram-bot-interface';

export const actionSetDeliveryYes = (ctx: MyContext): void => {
	ctx.answerCbQuery();
	ctx.scene.enter(Scene.CITY);
};
export const actionSetDeliveryNo = (ctx: MyContext): void => {
	ctx.answerCbQuery();
	ctx.reply('Вы отказались от смены доставки');
};

export const actionSetCardYes = (ctx: MyContext): void => {
	ctx.answerCbQuery();
	ctx.scene.enter(Scene.NAME);
};

export const actionSetCardNo = (ctx: MyContext): void => {
	ctx.answerCbQuery();
	ctx.reply('Вы отказались от скидочной карты');
};
