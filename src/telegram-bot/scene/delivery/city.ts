import { Scenes } from 'telegraf';
import { MyContext } from '../../telegram-bot.interface';
import { getCities } from '../../model/models';
import { cityNotFound, isCitySet, selectCity } from '../../view/scenes/delivery/city';
import { keyboardCity, removeKeyboard } from '../../keyboards/keyboards';

export const cityScene = new Scenes.BaseScene<MyContext>('city');

cityScene.enter(async (ctx) => {
	const cities = await getCities();
	ctx.sendMessage(selectCity(), keyboardCity(cities));
});

cityScene.on('text', async (ctx) => {
	const cities = await getCities();
	const respondUser = ctx.message.text;
	const cityExist = cities.includes(respondUser);
	if (cityExist) {
		ctx.session.city = respondUser;
		ctx.sendMessage(isCitySet(respondUser), removeKeyboard);
		ctx.scene.enter('shop');
	} else {
		ctx.sendMessage(cityNotFound(), keyboardCity(cities));
	}
});
