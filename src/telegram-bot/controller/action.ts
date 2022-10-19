import { amountItemsInCatalog, getItemCatalogByNumber } from '../model/catalog';
import { Scene } from '../scene/types';
import { MyContext } from '../telegram-bot-interface';
import { messageItemCatalog } from '../view/controller/action';
import { Catalog } from '@prisma/client';
import { getPaginationKb } from '../keyboards/keyboards';

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
export const actionAddToCart = (ctx: MyContext): void => {
	ctx.answerCbQuery();
	ctx.reply('Добавление товара в корзину.');
};

export const actionSendItemCatalog = async (ctx: MyContext, itemName: string): Promise<void> => {
	if (ctx.callbackQuery !== undefined) ctx.answerCbQuery();
	const amountItems = await amountItemsInCatalog();
	const numberItem = parseInt(itemName.split('-')[1]);
	const itemCatalog = await getItemCatalogByNumber(numberItem);
	const message = messageItemCatalog(itemCatalog);
	await ctx.sendPhoto({ url: message.url });
	await ctx.replyWithHTML(message.caption, getPaginationKb(numberItem, amountItems));
};
