const { Notify } = require('notiflix');

const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30530922-b2ca10c8a64b9d14f98bafcf1';

export async function getPictures(searchWord) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: searchWord,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    console.log(response);
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
