# Проект shop-assistant бот для магазина с доставкой.

## Запуск проекта

- env (создать .env, указать переменные BOT_TOKEN, PORT, DATABASE_URL)
- `npm i` установим основные пакеты
- `npx prisma migrate dev` сделаем миграции
- `npx prisma db seed` добавим необходимые, начальные данные

## Меню клавиатуры по умолчанию.

1. Каталог
2. Карта лояльности
3. Корзина
4. Настройки

## Старт

1. Пользователь стартует бота.
2. Бот запрашивает город и адрес доставки, выбирает его.
3. Бот присылает список доступных товаров для покупки

## Действия пользователя.

1. Пользователь может посмотреть товары в корзине
2. Пользователь может удалить товары из корзины
3. Пользователь может перейти к оплате
4. После оплаты, пользователю приходит чек

## Настройки

1. Пользователь может изменить город и адрес доставки
2. Изменить данные карты лояльности

## Данные для товара

1. Данные товара.
