import { Catalog } from '@prisma/client';

export const messageItemCatalog = (data: Catalog | null): { caption: string; url: string } => {
	if (data === null) return { caption: 'Не удалось найти товар', url: logo() };
	const caption = `<b>${data.name}</b>\nОписание на сайте здесь <a href="${data.link}">ссылка</a>`;
	const url = data.images;
	return { caption, url };
};

function logo(): string {
	return 'https://png.pngtree.com/png-vector/20191218/ourlarge/pngtree-sneakers-shoes-logo-with-badge-emblems-in-red-and-orange-gradation-png-image_2091355.jpg';
}
