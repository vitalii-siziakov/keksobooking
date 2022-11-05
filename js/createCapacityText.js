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
  return `${createRoomsText(rooms)} для ${createGuestsText(guests)}`;
}

export { createCapacityText, createGuestsText };
