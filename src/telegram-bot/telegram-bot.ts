import 'dotenv/config';
import { IBotTelegram, MyContext } from './telegram-bot.interface';
import { Telegraf, Scenes } from 'telegraf';
import { ILogger } from '../logger/logger.interface';
import { help, start, settings, card } from './commands/commands';
import { startScene } from './scenes/startScene';
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
		this.initCommands();
		this.initStageMiddleware();
	}

	private initStageMiddleware(): void {
		this.bot.use(new LocalSession({ database: 'session.json' }).middleware());
		const stage = new Scenes.Stage<MyContext>([startScene]);
		this.bot.use(stage.middleware());
		this.bot.command('test', (ctx) => ctx.scene.enter('test'));
		this.bot.command('start', (ctx) => ctx.scene.enter('start'));
	}

	private initCommands(): void {
		this.bot.command('help', help);
		this.bot.command('settings', settings);
		this.bot.command('card', card);
	}

	public start(): void {
		this.bot.launch();
		this.logger.log(`bot lanunched on localhost:${this.port}`);
	}
}
