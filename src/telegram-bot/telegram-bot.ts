import 'dotenv/config';
import { IBotTelegram, MyContext } from './telegram-bot.interface';
import { Telegraf, Scenes } from 'telegraf';
import { ILogger } from '../logger/logger.interface';
import { help, start, settings, card } from './commands/commands';
import { cityScene, shopScene } from './scenes/delivery-scene';
import LocalSession from 'telegraf-session-local';
import { IConfigService } from './config/config.service.interface';
const { leave, enter } = Scenes.Stage;

export class BotTelegram implements IBotTelegram {
	private bot: Telegraf<MyContext>;
	constructor(private logger: ILogger, private config: IConfigService) {
		this.config = config;
		this.logger = logger;
		this.bot = new Telegraf<MyContext>(config.get('BOT_TOKEN'));
		this.initStageMiddleware();
		this.initCommands();
	}

	private initStageMiddleware(): void {
		this.bot.use(new LocalSession({ database: 'session.json' }).middleware());
		const stage = new Scenes.Stage<MyContext>([cityScene, shopScene]);
		this.bot.use(stage.middleware());
	}

	private initCommands(): void {
		this.bot.command('help', help);
		this.bot.command('settings', settings);
		this.bot.command('card', card);
		this.bot.command('start', (ctx) => {
			if (!ctx.session.city && !ctx.session.shop) {
				ctx.reply(
					`Привет!!! Для начала, нужно установить адрес доставки магазина.\nАдрес доставки установлен ${ctx.session.city} ${ctx.session.shop}`,
				);
				ctx.scene.enter('city');
			} else {
				ctx.reply(`Привет!!! Твой адрес доставки\n${ctx.session.city} ${ctx.session.shop}`);
			}
		});
	}
	public start(): void {
		this.bot.launch();
		this.logger.log(`bot launched`);
	}
}
