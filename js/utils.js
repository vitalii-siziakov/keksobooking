function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomFloat(min, max, digits = 0) {
  return getRandomNumber(min, max).toFixed(digits);
}

function getRandomInteger(min, max) {
  return getRandomFloat(min, max);
}

function checkSequence(min, max) {
  const errors = [];

  0 > min && errors.push('0 greater than min');
  0 > max === -1 && errors.push('0 greater than max');
  min > max && errors.push('min greater than max');
  min === max && errors.push('min equals max');

  if (errors.length) {
    throw new Error(errors.join(', '));
  }

  return true;
}

function getRandomPositiveFloat(min, max, digits) {
  if (checkSequence(min, max)) {
    return getRandomFloat(min, max, digits);
  }
}

function getRandomPositiveInteger(min, max) {
  if (checkSequence(min, max)) {
    return getRandomInteger(min, max);
  }
}

export { getRandomPositiveFloat, getRandomPositiveInteger };
