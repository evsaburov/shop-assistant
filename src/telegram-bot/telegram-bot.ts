import 'dotenv/config';
import { IBotTelegram, MyContext } from './telegram-bot.interface';
import { Telegraf, Scenes } from 'telegraf';
import { ILogger } from '../logger/logger.interface';
import { help, start, settings, card } from './commands/commands';
import { cityScene, shopScene } from './scenes/delivery-scene';

import LocalSession from 'telegraf-session-local';
const { leave, enter } = Scenes.Stage;

export class BotTelegram implements IBotTelegram {
	private token: string;
	private port: number;
	private bot: Telegraf<MyContext>;
	private logger: ILogger;

	private getPort(): number {
		if (typeof process.env.PORT === 'number') {
			return process.env.PORT;
		} else {
			return 3000;
		}
	}

	private getToken(): string {
		if (typeof process.env.BOT_TOKEN === 'string') {
			return process.env.BOT_TOKEN;
		} else throw new Error('ошибка определения токена');
	}

	constructor(logger: ILogger) {
		this.logger = logger;
		this.port = this.getPort();
		this.token = this.getToken();
		this.bot = new Telegraf<MyContext>(this.token);
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
					`Привет!!! Для начала, нужно устаносить адрес доставки магазина\n.Адрес доставки установлен ${ctx.session.city} ${ctx.session.shop}`,
				);
				ctx.scene.enter('city');
			} else {
				ctx.reply(`Привет!!! Твой адрес доставки\n${ctx.session.city} ${ctx.session.shop}`);
			}
		});
	}
	public start(): void {
		this.bot.launch();
		this.logger.log(`bot lanunched on localhost:${this.port}`);
	}
}
