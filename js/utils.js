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

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function copy(array) {
  return array.slice();
}

function isEmpty(element) {
  let empty = true;
  let checkedValue = '';

  if (typeof element === 'string' || Array.isArray(element)) {
    checkedValue = element.length;
  } else {
    checkedValue = Object.keys(element).length;
  }

  checkedValue === 0 ? (empty = true) : (empty = false);

  return empty;
}

function modifyElementAttribute(element, functionName, ...args) {
  element[functionName](...args);
}

function modifyElementsAttributes(elements, functionName, ...args) {
  for (const element of elements) {
    modifyElementAttribute(element, functionName, ...args);
  }
}

export { getRandomPositiveFloat, getRandomPositiveInteger, shuffle, copy, modifyElementAttribute, modifyElementsAttributes };
