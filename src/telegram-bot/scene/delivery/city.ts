import { Scenes } from 'telegraf';
import { MyContext } from '../../telegram-bot-interface';
import { getCities } from '../../model/city';
import { cityNotFound, isCitySet, selectCity } from '../../view/scenes/delivery/city';
import { cityKeyboard, removeKeyboard } from '../../keyboards/keyboards';
import { Scene } from '../types';

export const cityScene = new Scenes.BaseScene<MyContext>(Scene.CITY);

cityScene.enter(async (ctx) => {
	const cities = await getCities();
	ctx.sendMessage(selectCity, cityKeyboard(cities));
});

cityScene.on('text', async (ctx) => {
	const cities = await getCities();
	const respondUser = ctx.message.text;
	const cityExist = cities.includes(respondUser);
	if (cityExist) {
		ctx.sendMessage(isCitySet(respondUser), removeKeyboard);
		ctx.session.city = respondUser;
		ctx.scene.enter(Scene.SHOP);
	} else {
		ctx.sendMessage(cityNotFound, cityKeyboard(cities));
	}
});
