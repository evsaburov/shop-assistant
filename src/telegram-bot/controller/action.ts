import { getItemCatalogById } from '../model/catalog';
import { Scene } from '../scene/types';
import { MyContext } from '../telegram-bot-interface';
import {
	messageItemCatalog,
	MessageItemInStore,
	messageItemNotFound,
} from '../view/controller/action';
import { getPaginationKb, toCartKeyboard } from '../keyboards/keyboards';
import { getItemStoreByCatalogId, getItemStoreById } from '../model/store';
import { cart } from '../controller/commands';
import { Store } from '@prisma/client';

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

export const actionSendItemCatalog = async (ctx: MyContext, itemCode: string): Promise<void> => {
	if (ctx.callbackQuery !== undefined) ctx.answerCbQuery();

	const itemCatalogId = getItemCatalogId(itemCode);

	const itemInCatalog = await getItemCatalogById(itemCatalogId);
	if (itemInCatalog === null) {
		ctx.replyWithPhoto(messageItemNotFound);
		return;
	}

	const itemInStore = await getItemStoreByCatalogId(itemInCatalog.id);
	if (itemInStore === null) {
		ctx.replyWithPhoto(messageItemNotFound);
		return;
	}

	const message = messageItemCatalog(itemInCatalog, itemInStore);

	await ctx.replyWithPhoto(
		{ url: message.url },
		{
			caption: message.caption,
			parse_mode: 'HTML',
			reply_markup: await getPaginationKb(itemCatalogId),
		},
	);
};

export const actionAddForCart = async (ctx: MyContext, code: string): Promise<void> => {
	ctx.answerCbQuery();

	const itemsInStore = await itemsInStoreByCode(code);
	if (itemsInStore === null) {
		ctx.replyWithPhoto(messageItemNotFound);
		return;
	}

	itemsInStore.map((item) => {
		ctx.replyWithHTML(MessageItemInStore(item), toCartKeyboard(item.id));
	});
};

export const actionAddToCart = async (ctx: MyContext, code: string): Promise<void> => {
	ctx.answerCbQuery();

	const numberItemInStore = parseInt(code.split('-')[1]);

	const itemsInStore = await getItemStoreById(numberItemInStore);
	if (itemsInStore === null) {
		ctx.replyWithPhoto(messageItemNotFound);
		return;
	}

	const itemNameJson = JSON.parse(JSON.stringify(itemsInStore)).catalog.name;

	const order = {
		shipmentId: itemsInStore.id,
		name: itemNameJson,
		size: itemsInStore.size,
		color: itemsInStore.color,
		price: itemsInStore.price.toNumber(),
	};

	ctx.session.cart.push(order);
	ctx.reply(`${itemNameJson} добавлен в корзину.`);
};

export const actionDeleteFromCart = async (ctx: MyContext, code: string): Promise<void> => {
	ctx.answerCbQuery();

	const numberItemInStore = parseInt(code.split('-')[1]);

	const itemsInStore = await getItemStoreById(numberItemInStore);
	if (itemsInStore === null) {
		ctx.replyWithPhoto(messageItemNotFound);
		return;
	}

	const cartContent = ctx.session.cart;
	ctx.session.cart = cartContent.filter((el) => el.shipmentId !== numberItemInStore);
	await ctx.reply(`Товар удален`);
	await cart(ctx);
};

export const actionPayFromCart = (ctx: MyContext): void => {
	ctx.answerCbQuery();
	ctx.session.cart = [];
	ctx.sendMessage('Ваш заказ оплачен, ожидает в магазине...');
};

function getItemCatalogId(itemCode: string): number {
	return parseInt(itemCode.split('-')[1]);
}

export async function itemsInStoreByCode(code: string): Promise<Store[] | null> {
	const numberItem = parseInt(code.split('-')[1]);
	const itemInCatalog = await getItemCatalogById(numberItem);
	if (itemInCatalog === null) return null;
	const itemsInStore = await getItemStoreByCatalogId(itemInCatalog.id);
	if (itemsInStore === null) return null;
	return itemsInStore;
}
