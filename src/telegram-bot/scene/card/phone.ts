import { Markup, Scenes } from 'telegraf';
import { MyContext } from '../../telegram-bot.interface';
import { removeKeyboard, exitKeyboards } from '../../keyboards/keyboards';

export const phoneScene = new Scenes.BaseScene<MyContext>('phone');

phoneScene.enter(async (ctx) => {
	ctx.reply('Укажите номер телефона в формате +7XXXXXXXXXX', exitKeyboards);
});

phoneScene.on('text', (ctx) => {
	const respondUser = ctx.message.text;
	const regExp = /^(\+7)([\d]{10})$/;
	if (regExp.test(respondUser)) {
		ctx.reply('Номер телефона принят', removeKeyboard);
		ctx.scene.enter('email');
	} else {
		ctx.reply('Номер телефона не соответствует формату, попробуйте еще раз', exitKeyboards);
	}
});
