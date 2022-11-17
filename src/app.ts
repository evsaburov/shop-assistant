import { ILogger } from './logger/logger.interface';
import { IBotTelegram } from './telegram-bot/telegram-bot-interface';

export class App {
	logger: ILogger;
	botTelegram: IBotTelegram;

	constructor(logger: ILogger, botTelegram: IBotTelegram) {
		this.botTelegram = botTelegram;
		this.logger = logger;
	}

	init(): void {
		this.botTelegram.start();
	}
}
