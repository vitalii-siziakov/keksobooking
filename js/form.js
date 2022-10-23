const TYPES_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

function setMinPrice(typeID, priceID) {
  const type = document.querySelector(`#${typeID}`);
  const price = document.querySelector(`#${priceID}`);

  type.addEventListener('change', function () {
    const minPrice = TYPES_MIN_PRICE[type.value];

    price.min = minPrice;
    price.placeholder = minPrice;
  });
}

function setCheckInOut(checkInID, checkOutID) {
  const checkIn = document.querySelector(`#${checkInID}`);
  const checkOut = document.querySelector(`#${checkOutID}`);

  checkIn.addEventListener('change', function () {
    checkOut.value = checkIn.value;
  });

  checkOut.addEventListener('change', function () {
    checkIn.value = checkOut.value;
  });
}

setMinPrice('type', 'price');
setCheckInOut('timein', 'timeout');
