import { Scenes, Markup } from 'telegraf';
import { MyContext } from '../../telegram-bot.interface';
import { getCities } from '../../database/commands';
import { cityNotFound, isCitySet, selectCity } from '../../view/scenes/delivery/city';
const removeKeyboard = Markup.removeKeyboard();

export const cityScene = new Scenes.BaseScene<MyContext>('city');

cityScene.enter(async (ctx) => {
	const cities = await getCities();
	ctx.sendMessage(selectCity(), Markup.keyboard(cities).resize().oneTime());
});

cityScene.on('text', async (ctx) => {
	const cities = await getCities();
	const respondUser = ctx.message.text;
	const cityExist = cities.includes(respondUser);
	if (cityExist) {
		ctx.session.city = respondUser;
		ctx.sendMessage(isCitySet(respondUser), removeKeyboard);
		return ctx.scene.enter('shop');
	} else {
		ctx.sendMessage(cityNotFound(), Markup.keyboard(cities).resize());
	}
});
