import { Scenes } from 'telegraf';
import { MyContext } from '../../telegram-bot.interface';
import { removeKeyboard, exitKeyboards } from '../../keyboards/keyboards';

export const nameScene = new Scenes.BaseScene<MyContext>('name');

nameScene.enter(async (ctx) => {
	ctx.sendMessage('Укажите Ваше ФИО', exitKeyboards);
});

nameScene.on('text', async (ctx) => {
	const regExp = /^[А-ЯЁ][а-яё]{2,}([-][А-ЯЁ][а-яё]{2,})?\s[А-ЯЁ][а-яё]{2,}\s[А-ЯЁ][а-яё]{2,}$/;
	const respondUser = ctx.message.text;
	if (regExp.test(respondUser)) {
		console.log(respondUser);
		ctx.sendMessage('ФИО установлено', removeKeyboard);
		ctx.scene.enter('phone');
	} else {
		ctx.sendMessage('Некорректно указано ФИО, попробуйте еще раз...', exitKeyboards);
	}
});
