'use strict';

var GOODS_COUNT = 26;

var GOODS_NAMES = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];

var INGRIDIENTS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var PHOTOS = [
  'img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-eggplant.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  '/img/cards/soda-russian.jpg'
];

var RATING_CLASSES = [
  'stars__rating--one',
  'stars__rating--two',
  'stars__rating--three',
  'stars__rating--four',
  'stars__rating--five'
];

// Функции для получения числа от и до, и случайное получение числа.

var getIntegerNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomNumber = function () {
  return Math.random();
};

// Функция Сахара или без захара.
var getSugarStatus = function () {
  var result = Math.random() < 0.5 ? 'Содержит сахар' : 'Без сахара';
  return result;
};

var generateIngridientsList = function () {
  var min = getIntegerNumber(0, INGRIDIENTS.length - 2);
  var max = getIntegerNumber(min + 1, INGRIDIENTS.length - 1);
  return INGRIDIENTS.slice(min, max).join(',');
};

var generateProducts = function () {
  var goods = [];
  for (var i = 0; i < GOODS_COUNT; i++) {
    goods[i] = {
      name: GOODS_NAMES[i],
      picture: PHOTOS[i],
      amount: getIntegerNumber(0, 20),
      price: getIntegerNumber(100, 1500),
      weight: getIntegerNumber(30, 300),
      rating: {
        value: getIntegerNumber(1, 5),
        number: getIntegerNumber(10, 900)
      },
      nutritionFacts: {
        sugar: getRandomNumber(),
        energy: getIntegerNumber(10, 20),
        contents: generateIngridientsList()
      }
    };
  }
  return goods;
};

var generated = generateProducts();

// Работа с классами

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var catalogLoadHidden = document.querySelector('.catalog__load');
catalogLoadHidden.classList.add('visually-hidden');

var catalogTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

// Функция отрисовки элементов с данными для карточки

var createCardElement = function (good) {
  var cardElement = catalogTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = good.name;
  cardElement.querySelector('.card__img').src = good.picture;
  cardElement.querySelector('.card__price').innerHTML = good.price + '<span class="card__currency">₽</span><span class="card__weight">/' + good.weight + 'Г</span>';
  cardElement.querySelector('.star__count').textContent = good.rating.number;
  cardElement.querySelector('.card__characteristic').textContent = getSugarStatus(good.nutritionFacts.sugar);
  cardElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;
  cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
  cardElement.querySelector('.stars__rating').classList.add(RATING_CLASSES[good.rating.value - 1]);
  cardElement.classList.add(getAmountClass(good));
  return cardElement;
};

// Функция для добавления класса к  amount при различных условиях

var getAmountClass = function (good) {
  if (good.amount > 5) {
    return 'card--in-stock';
  } else if (good.amount >= 1 && good.amount <= 5) {
    return 'card--little';
  }
  return 'card--soon';
};

// Третья часть, генерируем еще один массив

var basketCard = document.querySelector('.goods__cards');
basketCard.classList.remove('goods__cards--empty');

var basketCardHidden = document.querySelector('.goods__card-empty');
basketCardHidden.classList.add('visually-hidden');

var basketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

var createBasketElement = function (good) {
  var basketElement = basketTemplate.cloneNode(true);
  basketElement.querySelector('.card-order__title').textContent = good.name;
  basketElement.querySelector('.card-order__img').src = good.picture;
  basketElement.querySelector('.card-order__price').innerHTML = good.price + '<span class="card-order__price">₽</span>';
  return basketElement;
};

for (var k = 0; k < 3; k++) {
  basketTemplate.appendChild(createBasketElement(generated[k]));
}
basketCard.appendChild(basketTemplate);

// Функция рендеринга Массива товаров.
var goodsList = document.querySelector('.catalog__cards');

var renderElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < GOODS_COUNT; i++) {
    fragment.appendChild(createCardElement(generated[i]));
  }
  goodsList.appendChild(fragment);
};

renderElements();

// Добавление в избранное
var favoriteButton = document.querySelectorAll('.card__btn-favorite');
var clickFavoriteElement = null;

for (var l = 0; l < favoriteButton.length; l++) {
  favoriteButton[l].addEventListener('click', function (event) {
    clickFavoriteElement = event.currentTarget;
    event.preventDefault();
    clickFavoriteElement.classList.toggle('card__btn-favorite--selected');
  });
}
