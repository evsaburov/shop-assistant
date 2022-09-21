import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { BotTelegram } from './telegram-bot/telegram-bot';

function bootstrap(): void {
	const logger = new LoggerService();
	const botTelegram = new BotTelegram(logger);
	const app = new App(logger, botTelegram);
	app.init();
}

bootstrap();
