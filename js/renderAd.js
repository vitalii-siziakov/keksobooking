import { createMockAds } from './mockData.js';

// utils
const TYPES_RU = { palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalow: 'Бунгало', hotel: 'Отель' };

function isEmpty(element) {
  let empty = true;
  let checkedValue;

  if (typeof element === 'string' || Array.isArray(element)) {
    checkedValue = element.length;
  } else {
    checkedValue = Object.keys(element).length;
  }

  checkedValue === 0 ? (empty = true) : (empty = false);

  return empty;
}

function createModifers(modifier, properties) {
  return properties.map((property) => `${modifier}${property}`);
}

function removeNodeChilds(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function createFeatures(featuresContainer, featuresList, modifiers) {
  removeNodeChilds(featuresContainer);

  featuresList.forEach((featuresListItem) => {
    const modifier = featuresListItem.classList[1];

    if (modifiers.includes(modifier)) {
      featuresContainer.appendChild(featuresListItem);
    }
  });
}

function createPhotos(photosContainer, photoNode, photos) {
  removeNodeChilds(photosContainer);

  photos.forEach((photo) => {
    const photoItem = photoNode.cloneNode(true);
    photoItem.src = photo;
    photosContainer.appendChild(photoItem);
  });
}

function createRoomsText(rooms) {
  const exceptions = {
    1: 'комнатa',
    2: 'комнаты',
    3: 'комнаты',
    4: 'комнаты',
    11: 'комнат',
    12: 'комнат',
    13: 'комнат',
    14: 'комнат',
  };

  let word = 'комнат';

  if (exceptions[Number(String(rooms).slice(-1))]) {
    word = exceptions[Number(String(rooms).slice(-1))];
  }

  if (exceptions[Number(String(rooms).slice(-2))]) {
    word = exceptions[Number(String(rooms).slice(-2))];
  }

  return `${rooms} ${word}`;
}

function createGuestsText(guests) {
  const exceptions = {
    1: 'гостя',
    11: 'гостей',
    12: 'гостей',
    13: 'гостей',
    14: 'гостей',
  };

  let word = 'гостей';

  if (exceptions[Number(String(guests).slice(-1))]) {
    word = exceptions[Number(String(guests).slice(-1))];
  }

  if (exceptions[Number(String(guests).slice(-2))]) {
    word = exceptions[Number(String(guests).slice(-2))];
  }

  return `${guests} ${word}`;
}

function createCapacityText(rooms, guests) {
  const text = isEmpty(rooms) || isEmpty(guests) ? '' : `${createRoomsText(rooms)} для ${createGuestsText(guests)}`;
  return text;
}

function createTimeText(checkin, checkout) {
  const text = isEmpty(checkin) || isEmpty(checkout) ? '' : `Заезд после ${checkin}, выезд до ${checkout}`;
  return text;
}

function createTypeText(type) {
  const text = isEmpty(type) ? '' : TYPES_RU[type];
  return text;
}

function createPriceText(price) {
  const text = isEmpty(price) ? '' : `${price} ₽/ночь`;
  return text;
}

// renderAd

function createAdvertForCard(advert) {
  const { offer, author } = advert;
  const cardAdvert = [
    {
      selector: '.popup__title',
      property: 'textContent',
      value: offer.title,
    },
    {
      selector: '.popup__text--address',
      property: 'textContent',
      value: offer.address,
    },
    {
      selector: '.popup__text--price',
      property: 'textContent',
      value: createPriceText(offer.price),
    },
    {
      selector: '.popup__type',
      property: 'textContent',
      value: createTypeText(offer.type),
    },
    {
      selector: '.popup__text--capacity',
      property: 'textContent',
      value: [offer.rooms, offer.guests],
    },
    {
      selector: '.popup__text--capacity',
      property: 'textContent',
      value: createCapacityText(offer.rooms, offer.guests),
    },
    {
      selector: '.popup__text--time',
      property: 'textContent',
      value: createTimeText(offer.checkin, offer.checkout),
    },
    {
      selector: '.popup__description',
      property: 'textContent',
      value: offer.description,
    },
    {
      selector: '.popup__avatar',
      property: 'src',
      value: author.avatar,
    },
    {
      selector: '.popup__features',
      property: '',
      value: offer.features,
    },
    {
      selector: '.popup__photos',
      property: '',
      value: offer.photos,
    },
  ];
  return cardAdvert;
}

function createCard(advert) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.cloneNode(true);
  const cardAdvert = createAdvertForCard(advert);

  cardAdvert.forEach((item) => {
    const node = card.querySelector(item.selector);
    const nodeValueEmptyStatus = isEmpty(item.value);
    
    if (nodeValueEmptyStatus) {
      node.style.display = 'none';
    }

    const nodeSelector = item.selector;
    const nodeProperty = item.property;
    const nodeValue = nodeValueEmptyStatus ? '' : item.value;

    switch (nodeSelector) {
      case '.popup__features':
        if (nodeValueEmptyStatus) {
          removeNodeChilds(node);
        } else {
          const featuresContainer = node;
          const featuresList = featuresContainer.querySelectorAll('.popup__feature');
          const featuresModifiers = createModifers('popup__feature--', nodeValue);
          createFeatures(featuresContainer, featuresList, featuresModifiers);
        }
        break;
      case '.popup__photos':
        if (nodeValueEmptyStatus) {
          removeNodeChilds(node);
        } else {
          const photosContainer = node;
          const photoItem = photosContainer.querySelector('.popup__photo');
          createPhotos(photosContainer, photoItem, nodeValue);
        }
        break;
      default:
        node[nodeProperty] = nodeValue;
    }
  });

  return card;
}

const mockAds = createMockAds(1);
const mockAd = mockAds[0];

document.querySelector('#map-canvas').appendChild(createCard(mockAd));
