import { Scenes, Markup } from 'telegraf';
import { MyContext } from '../../telegram-bot.interface';
import { getShopsByCity } from '../../database/commands';
import { isShopSelect, selectShop, shopNotFound, shopsList } from '../../view/scenes/delivery/shop';

const removeKeyboard = Markup.removeKeyboard();

export const shopScene = new Scenes.BaseScene<MyContext>('shop');

shopScene.enter(async (ctx) => {
	const city = ctx.session.city;
	const shops = await getShopsByCity(city);
	const shopList = shopsList(shops);
	ctx.sendMessage(
		selectShop(),
		Markup.keyboard([...shopList])
			.resize()
			.oneTime(),
	);
});

shopScene.on('text', async (ctx) => {
	const city = ctx.session.city;
	const respondUser = ctx.message.text;
	const shops = await getShopsByCity(city);
	const shopList = shopsList(shops);
	const isShopExist = shopExist(shopList, respondUser);
	if (isShopExist) {
		ctx.session.shop = respondUser;
		ctx.sendMessage(isShopSelect(respondUser), removeKeyboard);
		return ctx.scene.leave();
	} else {
		ctx.sendMessage(
			shopNotFound(),
			Markup.keyboard([...shopList])
				.resize()
				.oneTime(),
		);
	}
});

function shopExist(shopList: string[], respondUser: string): boolean {
	return shopList.includes(respondUser);
}
