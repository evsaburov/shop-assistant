import { Scenes, Markup } from 'telegraf';
import { MyContext } from '../../telegram-bot-interface';
import { getShopsByCity } from '../../model/shop';
import { isShopSelect, selectShop, shopsList } from '../../view/scenes/delivery/shop';
import { mainKeyboard, removeKeyboard, shopKeyboard } from '../../keyboards/keyboards';
import { Scene } from '../types';
import { actionSendItemCatalog } from '../../controller/action';

export const shopScene = new Scenes.BaseScene<MyContext>(Scene.SHOP);

shopScene.enter(async (ctx) => {
	const city = ctx.session.city;
	const shops = await getShopsByCity(city);
	const shopList = shopsList(shops);
	ctx.sendMessage(selectShop, shopKeyboard(shopList));
});

shopScene.on('text', async (ctx) => {
	const city = ctx.session.city;
	const respondUser = ctx.message.text;
	const shops = await getShopsByCity(city);
	const shopList = shopsList(shops);
	const isShopExist = shopExist(shopList, respondUser);
	if (isShopExist) {
		ctx.session.shop = respondUser;
		ctx.sendMessage(isShopSelect(respondUser), mainKeyboard);
		actionSendItemCatalog(ctx, 'cat-1');
		ctx.scene.leave();
	} else {
		shopKeyboard(shopList);
	}
});

function shopExist(shopList: string[], respondUser: string): boolean {
	return shopList.includes(respondUser);
}
