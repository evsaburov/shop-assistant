import 'dotenv/config';
import { Telegraf, Scenes } from 'telegraf';
import { IBotTelegram, MyContext } from './telegram-bot-interface';
import { ILogger } from '../logger/logger.interface';
import LocalSession from 'telegraf-session-local';
import { help, start, settings, card, setDelivery, exit } from './controller/commands';
import {
	actionSetDeliveryYes,
	actionSetDeliveryNo,
	actionSetCardNo,
	actionSetCardYes,
} from './controller/action';
import { cityScene, shopScene, nameScene, phoneScene, emailScene } from './scene/scenes';
import { IConfigService } from '../config/config.service.interface';
import { userController } from './middleware/userController';

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
		this.bot.command('help', help);
		this.bot.command('settings', settings);
		this.bot.command('card', card);
		this.bot.command('setDelivery', setDelivery);
		this.bot.command('start', start);
	}

	private actions(): void {
		this.bot.action('setDeliveryYes', actionSetDeliveryYes);
		this.bot.action('setDeliveryNo', actionSetDeliveryNo);
		this.bot.action('setCardYes', actionSetCardYes);
		this.bot.action('setCardNo', actionSetCardNo);
	}

	public start(): void {
		this.bot.launch();
		this.logger.log(`bot launched`);
	}
}
