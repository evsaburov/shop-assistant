import { SceneSessionData } from 'telegraf/typings/scenes';
import { Context, Scenes } from 'telegraf';
import { Catalog } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Cart } from './types';

export interface IBotTelegram {
	start(): void;
}

type MySessionScene = SceneSessionData;

interface MySession extends Scenes.SceneSession<MySessionScene> {
	user: number;
	name: string;
	chat: number;
	shop: string;
	city: string;
	cardName: string;
	cardEmail: string;
	cardPhone: string;
	cart: Cart;
}

export interface MyContext extends Context {
	prop: string;
	session: MySession;
	scene: Scenes.SceneContextScene<MyContext, MySessionScene>;
}
