import { Scenes, Markup } from 'telegraf';
import { MyContext } from '../telegram-bot.interface';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const { leave } = Scenes.Stage;

export const startScene = new Scenes.BaseScene<MyContext>('start');

const greatingUser = async (ctx: MyContext): Promise<void> => {
	ctx.reply(
		`Привет ${ctx.message?.from.username}. Бот ассистент интернет магизина. Сначала выберете город, а потом ближайший магазин в вашем городе.`,
	);
	const cityKeyboard = await getCities();
	ctx.sendMessage('Выберете Ваш город', Markup.keyboard([...cityKeyboard]));
};

const deliveryExist = (ctx: MyContext): string => {
	return `Привет. У вас установлен адрес по умолчанию ${ctx.session.delivery}. Изменить его можно через кнопку "настройки"`;
};

startScene.enter((ctx) => {
	ctx.session.delivery == undefined ? greatingUser(ctx) : ctx.reply(deliveryExist(ctx));
});

startScene.command('back', leave<MyContext>());
startScene.leave((ctx) => ctx.reply('by'));

const getCities = async (): Promise<string[]> => {
	const cities = await prisma.city.findMany({
		where: {},
		distinct: ['name'],
	});
	return cities.map((el) => el.name);
};
