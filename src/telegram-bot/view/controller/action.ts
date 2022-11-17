import { Catalog, Store } from '@prisma/client';

export const messageItemCatalog = (
	data: Catalog,
	items: Store[],
): { caption: string; url: string } => {
	const captionInStore = items.map((item): String[] => {
		return [
			`\nЦвет: ${item.color}. Количество: ${item.amount}. Размер: ${item.size}. Цена: ${item.price} р.`,
		];
	});
	const allItemsInStore = captionInStore.join();
	const captionInCatalog = `<b>${data.name}</b>\n ℹ️ Подробное описание <a href="${data.link}">здесь</a>\n`;
	const caption = `${captionInCatalog} ${allItemsInStore}`;
	const url = data.images;
	return { caption, url };
};
export const logo =
	'https://png.pngtree.com/png-vector/20191218/ourlarge/pngtree-sneakers-shoes-logo-with-badge-emblems-in-red-and-orange-gradation-png-image_2091355.jpg';
export const messageItemNotFound = { caption: ' 😞Не удалось найти описание товара', url: logo };

export const MessageItemInStore = (item: Store): string => {
	return `\n<b>Описание:</b> \n${item.description}\n\n<b>Цвет:</b> ${item.color}.\n<b>Количество всего:</b> ${item.amount}.\n<b>Размер:</b> ${item.size}.\n<b>Цена:</b> ${item.price} р.`;
};
