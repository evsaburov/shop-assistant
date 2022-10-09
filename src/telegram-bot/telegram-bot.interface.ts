import { SceneSessionData } from 'telegraf/typings/scenes';
import { Context, Scenes } from 'telegraf';

export interface IBotTelegram {
	start(): void;
}

interface MySessionScene extends SceneSessionData {
	prop: string;
}

interface MySession extends Scenes.SceneSession<MySessionScene> {
	user: number;
	name: string;
	chat: number;
	city: string;
	shop: string;
}

export interface MyContext extends Context {
	prop: string;
	session: MySession;
	scene: Scenes.SceneContextScene<MyContext, MySessionScene>;
}
