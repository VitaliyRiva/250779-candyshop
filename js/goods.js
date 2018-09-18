'use strict';

var GOODS_COUNT = 26;

var GOODS_NAME = [
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
  'img/cards/soda-russian.jpg'
];

// Функции для получения числа от и до, и случайное получение числа.

var getIntegerNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomNumber = function () {
  return Math.random(Math.random());
};

// Функция Сахара или без захара.
var getRandomBol = function () {
  var result = Math.random() < 0.5 ? 'Содержит сахар' : 'Без сахара';
  return result;
};

var generateIngridientsList = function () {
  var min = getIntegerNumber(0, INGRIDIENTS.length - 2);
  var max = getIntegerNumber(min + 1, INGRIDIENTS.length - 1);
  return INGRIDIENTS.slice(min, max).join(',');
};

var generateProducts = function () {
  var countGoods = [];
  for (var i = 0; i < GOODS_COUNT; i++) {
    countGoods[i] = {
      name: GOODS_NAME[i],
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
  return countGoods;
};

var tmp = generateProducts();

// Классы рейтинга
var ratingClasses = [
  'stars__rating--one',
  'stars__rating--two',
  'stars__rating--three',
  'stars__rating--four',
  'stars__rating--five'
];

// Работа с классами

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var catalogLoadHidden = document.querySelector('.catalog__load');
catalogLoadHidden.classList.add('visually-hidden');

var catalogTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

// Функция отрисовки элементов с данными для карточки

var createCardElements = function (good) {
  var cardElement = catalogTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = good.name;
  cardElement.querySelector('.card__img').src = good.picture;
  cardElement.querySelector('.card__price').innerHTML = good.price + '<span class="card__currency">₽</span><span class="card__weight">/' + good.weight + 'Г</span>';
  cardElement.querySelector('.star__count').textContent = good.rating.number;
  cardElement.querySelector('.card__characteristic').textContent = getRandomBol(good.nutritionFacts.sugar);
  cardElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;
  cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
  cardElement.querySelector('.stars__rating').classList.add(ratingClasses[good.rating.value - 1]);
  cardElement.classList.add(getAmountClass(good));
  return cardElement;
};

// Функция для добавления класса к  amount при различных условиях

var getAmountClass = function (good) {
  if (good.amount > 5) {
    return 'card--in-stock';
  } else if (good.amount >= 1 && good.amount <= 5) {
    return 'card--little';
  } else if (good.amount === 0) {
    return 'card--soon';
  }
  return getAmountClass;
};

// Функция для добавления класса к rating при различных условиях

var getRatingClass = function (good) {
  if (good.rating.value === 1) {
    return 'stars__rating--one';
  } else if (good.rating.value === 2) {
    return 'stars__rating--two';
  } else if (good.rating.value === 3) {
    return 'stars__rating--three';
  } else if (good.rating.value === 4) {
    return 'stars__rating--four';
  }
  return 'stars__rating--five';
};

// Генирируем карточку товаров

var fragment = document.createDocumentFragment();
for (var i = 0; i < GOODS_COUNT; i++) {
  fragment.appendChild(createCardElements(tmp[i]));
}
catalogCards.appendChild(fragment);


// Третья часть, генерируем еще один массив

var basketCard = document.querySelector('.goods__cards');
basketCard.classList.remove('goods__cards--empty');

var basketCardHidden = document.querySelector('.goods__card-empty');
basketCardHidden.classList.add('visually-hidden');

var basketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

var createBasketElements = function (good) {
  var basketElement = basketTemplate.cloneNode(true);
  basketElement.querySelector('.card__title').textContent = good.name;
  basketElement.querySelector('.card__img').src = good.picture;
  basketElement.querySelector('.card__price').innerHTML = good.price + '<span class="card__currency">₽</span><span class="card__weight">/' + good.weight + 'Г</span>';
  basketElement.querySelector('.star__count').textContent = good.rating.number;
  basketElement.querySelector('.card__characteristic').textContent = getRandomBol(good.nutritionFacts.sugar);
  basketElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;
  basketElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
  basketElement.querySelector('.stars__rating').classList.add(ratingClasses[good.rating.value - 1]);
  basketElement.classList.add(getAmountClass(good));
  return basketElement;
};

var basketGoods = tmp.slice(0, 3);
var fragment2 = document.createDocumentFragment();
for (var k = 0; k < GOODS_COUNT; k++) {
  fragment2.appendChild(createBasketElements(basketGoods[k]));
}
catalogCards.appendChild(fragment2);