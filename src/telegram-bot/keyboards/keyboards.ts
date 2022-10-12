import { Markup } from 'telegraf';
import { ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { Button, CallbackAction } from './types';

export const mainKeyboard = Markup.keyboard([
	[Button.CATALOG, Button.CARD, Button.HELP, Button.SETTINGS],
])
	.resize()
	.oneTime();

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
export const mainMenuKeyboards = {};

export const exitKeyboard = Markup.keyboard([Button.EXIT]).oneTime().resize();
export const removeKeyboard = Markup.removeKeyboard();
