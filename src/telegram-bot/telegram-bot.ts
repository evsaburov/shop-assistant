import 'dotenv/config';
import { Telegraf, Scenes } from 'telegraf';
import { IBotTelegram, MyContext } from './telegram-bot-interface';
import { ILogger } from '../logger/logger.interface';
import LocalSession from 'telegraf-session-local';
import { help, start, settings, card, delivery, exit, catalog } from './controller/commands';
import {
	actionSetDeliveryYes,
	actionSetDeliveryNo,
	actionSetCardNo,
	actionSetCardYes,
} from './controller/action';
import { cityScene, shopScene, nameScene, phoneScene, emailScene } from './scene/scenes';
import { IConfigService } from '../config/config.service.interface';
import { userController } from './middleware/userController';
import { Actions, Commands, Hears } from './types';

export class BotTelegram implements IBotTelegram {
	private bot: Telegraf<MyContext>;
	constructor(private logger: ILogger, private config: IConfigService) {
		this.config = config;
		this.logger = logger;
		this.bot = new Telegraf<MyContext>(config.get('BOT_TOKEN'));
		this.sessionMiddleware();
		this.stageMiddleware();
		this.userMiddleware();
		this.commands();
		this.hears();
		this.actions();
	}

	private userMiddleware(): void {
		this.bot.use(async (ctx, next) => {
			await userController(ctx);
			next();
		});
	}

	private sessionMiddleware(): void {
		this.bot.use(new LocalSession({ database: 'session.json' }).middleware());
	}

	private stageMiddleware(): void {
		const stageScene = new Scenes.Stage<MyContext>([
			cityScene,
			shopScene,
			nameScene,
			phoneScene,
			emailScene,
		]);
		stageScene.hears('Выход', exit);
		this.bot.use(stageScene.middleware());
	}

	private commands(): void {
		this.bot.command(Commands.CARD, card);
		this.bot.command(Commands.DELIVERY, delivery);
		this.bot.command(Commands.START, start);
		this.bot.command(Commands.CATALOG, catalog);
		this.bot.command(Commands.HELP, help);
		this.bot.command(Commands.EXIT, exit);
	}

	private hears(): void {
		this.bot.hears(Hears.HELP, help);
		this.bot.hears(Hears.CARD, card);
		this.bot.hears(Hears.CATALOG, catalog);
	}

	private actions(): void {
		this.bot.action(Actions.DELIVERY_YES, actionSetDeliveryYes);
		this.bot.action(Actions.DELIVERY_NO, actionSetDeliveryNo);
		this.bot.action(Actions.CARD_YES, actionSetCardYes);
		this.bot.action(Actions.CARD_NO, actionSetCardNo);
	}

	public start(): void {
		this.bot.launch();
		this.logger.log(`bot launched`);
	}
}
