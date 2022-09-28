import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor() {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			throw new Error('Не удалось прочитать файл .env или он отсутствует');
		} else {
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get<T extends string | number>(key: string): T {
		return this.config[key] as T;
	}
}
