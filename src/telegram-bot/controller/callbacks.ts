import { getPaginationKb } from '../keyboards/keyboards';
import { amountItemsInCatalog } from '../model/catalog';
import { MyContext } from '../telegram-bot-interface';
import { Actions } from '../types';
import { pageNotFound } from '../view/commands/callbacks';
import {
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
	const regExpAddCart = /^addToCart_([\d]{0,100})$/;

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
		case data.match(regExpAddCart)?.input:
			ctx.answerCbQuery(data);
			break;

		default:
			ctx.reply(pageNotFound);
			break;
	}
};