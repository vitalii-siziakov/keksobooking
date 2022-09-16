import { getRandomPositiveFloat, getRandomPositiveInteger } from './utils.js'

const AVATARS = Array.from({ length: 10 }, (element, index) => (element = `img/avatars/user${('0' + String(index + 1)).slice(-2)}.png`))

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
]
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel']
const TIMES = ['12:00', '13:00', '14:00']
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
const LATS = [35.65, 35.7]
const LNGS = [139.7, 139.8]

function createAd() {
  let ad = {
    author: {
      avatar: '',
    },
    offer: {
      title: '',
      address: '',
      price: '',
      type: '',
      rooms: '',
      guests: '',
      checkin: '',
      checkout: '',
      features: '',
      description: '',
      photos: '',
    },
    location: {
      lat: '',
      lng: '',
    },
  }

  return ad
}
