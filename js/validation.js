import { createGuestsText } from './createCapacityText.js';

const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

Pristine.setLocale('ru');

/* 
Заголовок объявления
*/

function validateTitle(value) {
  const min = 30;
  const max = 100;

  return value.length >= min && value.length <= max;
}

function getTitleErrorMessage() {
  const title = document.querySelector('#title');
  const min = 30;
  const max = 100;

  return `От ${min} до ${max} символов. Введено: ${title.value.length}`;
}

const title = form.querySelector('#title');
pristine.addValidator(title, validateTitle, getTitleErrorMessage);

/*
Тип жилья 
Цена за ночь
*/

const TYPES_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

function validatePrice(value) {
  const type = form.querySelector('#type');
  const min = TYPES_MIN_PRICE[type.value];
  const max = 100000;

  return Number(value) >= min && Number(value) <= max;
}

function getPriceErrorMessage() {
  const type = form.querySelector('#type');
  const min = TYPES_MIN_PRICE[type.value];
  const max = 100000;

  return `От ${min} до ${max} руб.`;
}

function setMinMaxPrice() {
  const type = document.querySelector(`#type`);
  const price = document.querySelector(`#price`);
  const minPrice = TYPES_MIN_PRICE[type.value];
  price.min = minPrice;
  price.max = 100000;
  price.placeholder = minPrice;
}

const price = form.querySelector('#price');
const type = form.querySelector('#type');

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

function runTypePriceValidator() {
  setMinMaxPrice();
  pristine.validate(price);
}

type.addEventListener('change', runTypePriceValidator);

/*
Количество комнат
Количество мест
*/

const ROOMS_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

function validateRooms(value) {
  const capacity = form.querySelector('#capacity');
  const capacityValid = ROOMS_CAPACITY[Number(value)];

  return capacityValid.includes(Number(capacity.value));
}

function getRoomsErrorMessage() {
  const rooms = form.querySelector('#room_number');
  const roomsCapacity = ROOMS_CAPACITY[Number(rooms.value)];
  const capcityNotForGuests = roomsCapacity.includes(0);

  let message = 'Не для гостей';

  if (!capcityNotForGuests) {
    const minCapacity = roomsCapacity[0];
    const maxCapacity = roomsCapacity[roomsCapacity.length - 1];

    minCapacity === maxCapacity
      ? (message = `Для: ${createGuestsText(minCapacity)}`)
      : (message = `Для: ${minCapacity} - ${createGuestsText(maxCapacity)}`);
  }

  return message;
}

function validateCapacity(value) {
  const rooms = form.querySelector('#room_number');
  const capacityValid = ROOMS_CAPACITY[Number(rooms.value)];

  return capacityValid.includes(Number(value));
}

function getCapacityErrorMessage() {
  const capacity = form.querySelector('#capacity');

  const validRooms = [];

  for (let room in ROOMS_CAPACITY) {
    if (ROOMS_CAPACITY[room].includes(Number(capacity.value))) {
      validRooms.push(Number(room));
    }
  }
  validRooms.sort((a, b) => a - b);

  let message = `Требуется комнат: ${validRooms[0]}`;

  if (validRooms.length > 1) {
    message = `Требуется комнат: от ${validRooms[0]} до ${validRooms[1]}`;
  }

  return message;
}

const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

pristine.addValidator(rooms, validateRooms, getRoomsErrorMessage);
pristine.addValidator(capacity, validateCapacity, getCapacityErrorMessage);

function runRoomsCapacityValidator() {
  pristine.validate(rooms);
  pristine.validate(capacity);
}

rooms.addEventListener('change', runRoomsCapacityValidator);
capacity.addEventListener('change', runRoomsCapacityValidator);

/*
Время заезда и выезда
*/

function setTimeIn() {
  const timeIn = form.querySelector('#timein');
  const timeOut = form.querySelector('#timeout');
  timeOut.value = timeIn.value;
}

function setTimeOut() {
  const timeIn = form.querySelector('#timein');
  const timeOut = form.querySelector('#timeout');
  timeIn.value = timeOut.value;
}

const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

timeIn.addEventListener('change', setTimeIn);
timeOut.addEventListener('change', setTimeOut);

/*
Валидация формы при отправке
*/

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
