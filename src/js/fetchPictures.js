const { Notify } = require('notiflix');

const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30530922-b2ca10c8a64b9d14f98bafcf1';
export let totalAmountOfPictures = 0;

export async function getPictures(searchWord, page) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: searchWord,
        per_page: 40,
        page: page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    if (page === 1 && response.data.hits.length !== 0) {
      totalAmountOfPictures = response.data.totalHits;
      Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
    }

    return response.data.hits;
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
