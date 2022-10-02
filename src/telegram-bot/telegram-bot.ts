import 'dotenv/config';
import { IBotTelegram, MyContext } from './telegram-bot.interface';
import { Telegraf, Scenes, Context } from 'telegraf';
import { ILogger } from '../logger/logger.interface';
import { help, start, settings, card } from './commands/commands';
import { cityScene, shopScene } from './scenes/delivery-scene';
import LocalSession from 'telegraf-session-local';
import { IConfigService } from './config/config.service.interface';
import { userController } from './middleware/current-user';

export class BotTelegram implements IBotTelegram {
	private bot: Telegraf<MyContext>;
	constructor(private logger: ILogger, private config: IConfigService) {
		this.config = config;
		this.logger = logger;
		this.bot = new Telegraf<MyContext>(config.get('BOT_TOKEN'));
		this.stageMiddleware();
		this.userMiddleware();
		this.commands();
	}

	private userMiddleware(): void {
		this.bot.use((ctx, next) => {
			userController(ctx);
			next();
		});
	}

	private stageMiddleware(): void {
		this.bot.use(new LocalSession({ database: 'session.json' }).middleware());
		const stage = new Scenes.Stage<MyContext>([cityScene, shopScene]);
		this.bot.use(stage.middleware());
	}

	private commands(): void {
		this.bot.command('help', help);
		this.bot.command('settings', settings);
		this.bot.command('card', card);
		this.bot.command('start', (ctx) => {
			start(ctx);
		});
	}

	public start(): void {
		this.bot.launch();
		this.logger.log(`bot launched`);
	}
}
