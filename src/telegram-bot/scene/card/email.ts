import { Scenes } from 'telegraf';
import { removeKeyboard } from '../../keyboards/keyboards';
import { MyContext } from '../../telegram-bot.interface';

export const emailScene = new Scenes.BaseScene<MyContext>('email');

emailScene.enter(async (ctx) => {
	ctx.reply('Укажите ваш Email');
});

emailScene.on('text', async (ctx) => {
	const respondUser = ctx.message.text;
	const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	if (regExp.test(respondUser)) {
		ctx.reply('email принят', removeKeyboard);
		ctx.sendMessage('Для вас создана скидочная карта', removeKeyboard);
		ctx.scene.leave();
	} else {
		ctx.reply('email не соответствует формату, попробуйте еще раз');
	}
});
