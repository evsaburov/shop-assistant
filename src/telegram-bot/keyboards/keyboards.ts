import { Markup } from 'telegraf';
import { ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

const menu = ['каталог', 'карта лояльности', 'настройки', 'помощь'];

export const keyboardCity = (arrayCity: string[]): Markup.Markup<ReplyKeyboardMarkup> => {
	return Markup.keyboard(arrayCity).resize().oneTime();
};

export const keyboardShop = (shopList: string[]): Markup.Markup<ReplyKeyboardMarkup> => {
	return Markup.keyboard([...shopList])
		.resize()
		.oneTime();
};

export const exitKeyboards = Markup.keyboard(['Выход']).oneTime().resize();
export const removeKeyboard = Markup.removeKeyboard();
