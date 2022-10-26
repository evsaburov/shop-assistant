import { MyContext } from '../telegram-bot-interface';
import { Actions } from '../types';
import { operationNotFound } from '../view/commands/callbacks';
import {
	actionAddForCart,
	actionAddToCart,
	actionDeleteFromCart,
	actionPayFromCart,
	actionSendItemCatalog,
	actionSetCardNo,
	actionSetCardYes,
	actionSetDeliveryNo,
	actionSetDeliveryYes,
} from './action';

export const callbacksController = async (ctx: MyContext): Promise<void> => {
	if (ctx.callbackQuery?.data === undefined) return;
	const data = ctx.callbackQuery.data;

	const regExpPage = /^cat-[1-9]{0,100}$/;
	const regExpForCart = /^addForCart-([\d]{0,100})$/;
	const regExpAddToCart = /^addToCart-([\d]{0,100})$/;
	const regExpDeleteFromCart = /^deleteFromCart-([\d]{0,100})$/;
	const regExpPayToCart = /^payToCart([\d]{0,100})$/;

	switch (data) {
		case Actions.CARD_YES:
			actionSetCardYes(ctx);
			break;
		case Actions.CARD_NO:
			actionSetCardNo(ctx);
			break;
		case Actions.DELIVERY_YES:
			actionSetDeliveryYes(ctx);
			break;
		case Actions.DELIVERY_NO:
			actionSetDeliveryNo(ctx);
			break;
		case data.match(regExpPage)?.input:
			actionSendItemCatalog(ctx, data);
			break;
		case data.match(regExpForCart)?.input:
			actionAddForCart(ctx, data);
			break;
		case data.match(regExpAddToCart)?.input:
			actionAddToCart(ctx, data);
			break;
		case data.match(regExpDeleteFromCart)?.input:
			actionDeleteFromCart(ctx, data);
			break;
		case data.match(regExpPayToCart)?.input:
			actionPayFromCart(ctx);
			break;

		default:
			ctx.reply(operationNotFound);
			break;
	}
};
