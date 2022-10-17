import { Markup } from 'telegraf';
import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { inlineKeyboard } from 'telegraf/typings/markup';
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

export function getPaginationKb(current: number, maxPage: number): kbInline {
	const keys = [];
	if (current > 1) keys.push({ text: `«1`, callback_data: 'cat-1' });
	if (current > 2)
		keys.push({ text: `‹${current - 1}`, callback_data: `cat-${(current - 1).toString()}` });
	keys.push({ text: `-${current}-`, callback_data: `cat-${current.toString()}` });
	if (current < maxPage - 1)
		keys.push({ text: `${current + 1}›`, callback_data: `cat-${(current + 1).toString()}` });
	if (current < maxPage)
		keys.push({ text: `${maxPage}»`, callback_data: `cat-${maxPage.toString()}` });
	keys.push({ text: 'Заказать', callback_data: `addToCart_${current}` });
	return { reply_markup: { inline_keyboard: [keys] } };
}

export const exitKeyboard = Markup.keyboard([Button.EXIT]).oneTime().resize();
export const removeKeyboard = Markup.removeKeyboard();
