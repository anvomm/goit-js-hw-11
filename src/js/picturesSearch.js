import { getPictures } from './fetchPictures';

const form = document.querySelector('.search-form');

form.addEventListener('submit', onSubmitSearch);

function onSubmitSearch(e) {
  e.preventDefault();
  getPictures(e.currentTarget.elements.searchQuery.value);
}
