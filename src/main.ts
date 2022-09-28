import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from './telegram-bot/config/config.service';
import { BotTelegram } from './telegram-bot/telegram-bot';

function bootstrap(): void {
	const logger = new LoggerService();
	const config = new ConfigService();
	const botTelegram = new BotTelegram(logger, config);
	const app = new App(logger, botTelegram);
	app.init();
}

bootstrap();
