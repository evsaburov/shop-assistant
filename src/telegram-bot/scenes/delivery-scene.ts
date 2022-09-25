import { Scenes, Markup } from 'telegraf';
import { MyContext } from '../telegram-bot.interface';
import { getCities, getShopsByCity } from '../database/commands';

const removeKeyboard = Markup.removeKeyboard();

export const cityScene = new Scenes.BaseScene<MyContext>('city');

cityScene.enter(async (ctx) => {
	const cities = await getCities();
	ctx.sendMessage('Выберете Ваш город из списка', Markup.keyboard(cities).resize().oneTime());
});

cityScene.on('text', async (ctx) => {
	const cities = await getCities();
	const respondUser = ctx.message.text;
	if (cities.includes(respondUser)) {
		ctx.session.city = respondUser;
		ctx.sendMessage(`Ваш город доставки ${respondUser}`, removeKeyboard);
		return ctx.scene.enter('shop');
	} else {
		ctx.sendMessage(
			'Город не распознан, попробуйте выбрать еще раз',
			Markup.keyboard(cities).resize(),
		);
	}
});

export const shopScene = new Scenes.BaseScene<MyContext>('shop');

shopScene.enter(async (ctx) => {
	const city = ctx.session.city;
	const shops = await getShopsByCity(city);
	const shopList = shops.map((el) => {
		return `${el.name} - ${el.street} ${el.home}`;
	});
	ctx.sendMessage(
		'Выберете магизин в вашем городе',
		Markup.keyboard([...shopList])
			.resize()
			.oneTime(),
	);
});

shopScene.on('text', async (ctx) => {
	const city = ctx.session.city;
	const respondUser = ctx.message.text;
	const shops = await getShopsByCity(city);
	const shopsList = shops.map((el) => {
		return `${el.name} - ${el.street} ${el.home}`;
	});
	if (shopsList.includes(respondUser)) {
		ctx.session.shop = respondUser;
		ctx.sendMessage(`Ваш магазин доставки ${respondUser}`, removeKeyboard);
		return ctx.scene.leave();
	} else {
		ctx.sendMessage(
			'Магазин не распознан, попробуйте выбрать еще раз',
			Markup.keyboard([...shopsList])
				.resize()
				.oneTime(),
		);
	}
});
