**Read in English: [Nanny.Services](README.md).**<br />

# Додаток "Nanny.Services"

## Опис

"Nanny.Services" - це веб-додаток, який дозволяє користувачам знайти нянь для своїх дітей. Додаток складається з трьох основних сторінок: "Home", "Nannies" та "Favorites".

## Основні технології

- React.js
- Firebase (Realtime Database та аутентифікація)
- Formik & Yup для валідації форм
- React Router для маршрутизації

## Домашня сторінка

![Home page screenshot](./src/img/home.png)

Home: Сторінка містить заголовок сайту, слоган компанії та посилання, що перенаправляє на сторінку "Nannies". Стилізація відповідає прикладам, наведеним у макеті, з різною палітрою кольорів.

## Сторінка каталогу нянь

![Catalog page screenshot](./src/img/nannies.png)

Nannies: На цій сторінці користувач може переглядати перелік нянь, яких можна сортувати за різними параметрами: алфавітом, ціною або популярністю. Також доступна функція "Load more" для завантаження додаткових карток нянь.

Натисніть значок серця, щоб додати список до вибраного.

Натисніть Read more, щоб переглянути детальну інформацію про няню та відгуки від батьків.

Натиснувши на кнопку "Make an appointment" відкривається модальне вікно, в якому заповнивши поля форми можна відправити заявку на зустріч із нянею.

![Catalog page screenshot](./src/img/form.png)

## Сторінка вибраного

![Catalog page screenshot](./src/img/favorite.png)

Favorites: Сторінка, на якій користувач може переглянути картки нянь, які він додав у "обрані".
Ця сторінка доступна тільки для авторизованийх користувачів.

## Додаткова інформація

Програма використовує Redux для керування станом і Firebase (реєстрація, логінізація, отримання даних про користувача, логаут).

Проект розгорнуто на GitHub Pages.

## Демо

Проєкт доступний за посиланням [Nanny.Services](https://katerynabachkalo.github.io/nanny-services/).

## Технології, які використовувались

**Front-end**<br />
`TypeScript` `React` `React Router` `ReduxToolkit` `ReduxPersist` `Firebase` `nanoid` `HTML/CSS` `react-loader-spinner` `react-toastify` `Formik & Yup` `Респонсивний дизайн`

**Back-end**<br />
`Firebase (Realtime Database та аутентифікація)`
