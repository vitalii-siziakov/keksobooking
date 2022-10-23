const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const adFormСhildren = adForm.children;
const mapFiltersСhildren = mapFilters.children;

function modifyElementAttribute(element, functionName, ...args) {
  element[functionName](...args);
}

function modifyElementsAttributes(elements, functionName, ...args) {
  for (const element of elements) {
    modifyElementAttribute(element, functionName, ...args);
  }
}

function setActivePage() {
  modifyElementsAttributes(adFormСhildren, 'removeAttribute', 'disabled');
  modifyElementsAttributes(mapFiltersСhildren, 'removeAttribute', 'disabled');
}

function setInactivePage() {
  modifyElementsAttributes(adFormСhildren, 'setAttribute', 'disabled', true);
  modifyElementsAttributes(mapFiltersСhildren, 'setAttribute', 'disabled', true);
}
