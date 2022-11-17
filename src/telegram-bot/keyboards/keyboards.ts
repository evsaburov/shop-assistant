import { Markup } from 'telegraf';
import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { getMaxPage } from '../model/catalog';
import { Button, CallbackAction, kbInline } from './types';

export const mainKeyboard = Markup.keyboard([
	[Button.CATALOG, Button.CART, Button.CARD, Button.HELP],
]).resize();

export const cityKeyboard = (arrayCity: string[]): Markup.Markup<ReplyKeyboardMarkup> => {
	return Markup.keyboard(arrayCity).resize().oneTime();
};

export const shopKeyboard = (shopList: string[]): Markup.Markup<ReplyKeyboardMarkup> => {
	return Markup.keyboard([...shopList])
		.resize()
		.oneTime();
};

export const setDeliveryKeyboard = {
	reply_markup: {
		inline_keyboard: [
			[
				{ text: Button.YES, callback_data: CallbackAction.DELIVERY_YES },
				{ text: Button.NO, callback_data: CallbackAction.DELIVERY_NO },
			],
		],
	},
};

export const toCartKeyboard = (item: number): kbInline => {
	return {
		reply_markup: {
			inline_keyboard: [[{ text: Button.TO_CART, callback_data: `addToCart-${item}` }]],
		},
	};
};

export const payItemToCartKeyboard = {
	reply_markup: {
		inline_keyboard: [[{ text: Button.PAY_FROM_CART, callback_data: `payToCart` }]],
	},
};

export const deleteFromCartKeyboard = (item: number): kbInline => {
	return {
		reply_markup: {
			inline_keyboard: [
				[{ text: Button.DELETE_FROM_CART, callback_data: `deleteFromCart-${item}` }],
			],
		},
	};
};

export const setCardKeyboard = {
	reply_markup: {
		inline_keyboard: [
			[
				{ text: Button.YES, callback_data: CallbackAction.CARD_YES },
				{ text: Button.NO, callback_data: CallbackAction.CARD_NO },
			],
		],
	},
};

export async function getPaginationKb(current: number): Promise<InlineKeyboardMarkup> {
	const maxPage = await getMaxPage();
	const keys = [];
	if (current > 1) keys.push({ text: `«1`, callback_data: 'cat-1' });
	if (current > 2)
		keys.push({ text: `‹${current - 1}`, callback_data: `cat-${(current - 1).toString()}` });
	keys.push({ text: `-${current}-`, callback_data: `cat-${current.toString()}` });
	if (current < maxPage - 1)
		keys.push({ text: `${current + 1}›`, callback_data: `cat-${(current + 1).toString()}` });
	if (current < maxPage)
		keys.push({ text: `${maxPage}»`, callback_data: `cat-${maxPage.toString()}` });
	keys.push({ text: 'Подробнее', callback_data: `addForCart-${current}` });
	return { inline_keyboard: [keys] };
}

export const exitKeyboard = Markup.keyboard([Button.EXIT]).oneTime().resize();
export const removeKeyboard = Markup.removeKeyboard();
