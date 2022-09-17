import { getRandomPositiveFloat, getRandomPositiveInteger } from './utils.js';

const AVATARS = Array.from(
  { length: 10 },
  (element, index) => (element = `img/avatars/user${('0' + String(index + 1)).slice(-2)}.png`)
);

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const TYPES_RU = { palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalow: 'Бунгало', hotel: 'Отель' };

const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const LATS = [35.65, 35.7];
const LNGS = [139.7, 139.8];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function copy(array) {
  return array.slice();
}

function createMockAd(num) {
  const avatar = num > AVATARS.length ? AVATARS[getRandomPositiveInteger(1, AVATARS.length)] : AVATARS[num];
  const lat = getRandomPositiveFloat(LATS[0], LATS[1], 5);
  const lng = getRandomPositiveFloat(LNGS[0], LNGS[1], 5);

  const address = `${lat}, ${lng}`;
  const price = getRandomPositiveInteger(5000, 25000);
  const type = TYPES[getRandomPositiveInteger(0, TYPES.length - 1)];
  const typeRU = TYPES_RU[type];
  const [title, description] = [typeRU, typeRU];

  const rooms = getRandomPositiveInteger(1, 4);
  const guests = getRandomPositiveInteger(1, 6);
  const features = shuffle(copy(FEATURES)).slice(0, getRandomPositiveInteger(1, FEATURES.length));
  const photos = copy(PHOTOS).slice(0, getRandomPositiveInteger(1, PHOTOS.length));

  const checkin = TIMES[getRandomPositiveInteger(0, TIMES.length - 1)];
  const checkout = TIMES[getRandomPositiveInteger(0, TIMES.length - 1)];

  let ad = {
    author: {
      avatar: avatar,
    },
    offer: {
      title: title,
      address: address,
      price: price,
      type: type,
      rooms: rooms,
      guests: guests,
      checkin: checkin,
      checkout: checkout,
      features: features,
      description: description,
      photos: photos,
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };

  return ad;
}

function createMockAds(num) {
  return Array.from({ length: num }, (element, index) => createMockAd(index));
}

const mockAds = createMockAds(10);
