import { Notify } from 'notiflix';
import { getPictures } from './fetchPictures';
import refsList from './refs';

const refs = refsList();
let page = 1;
let searchWord = '';

const form = document.querySelector('.search-form');

form.addEventListener('submit', onSubmitSearch);

function onSubmitSearch(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';
  refs.footer.style.display = 'none';
  page = 1;
  searchWord = e.currentTarget.elements.searchQuery.value;
  getPictures(searchWord, page).then(renderMarkup);
  page += 1;
  form.reset();
  refs.loadMoreBtn.addEventListener('click', loadMorePictures);
}

function renderMarkup(array) {
  if (array.length === 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  const markup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
  <img src="${webformatURL}" alt=" ${tags}" width="300" height="200" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views  ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads  ${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  refs.loadMoreBtn.style.display = 'block';
  refs.footer.style.display = 'block';
  return refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function loadMorePictures() {
  getPictures(searchWord, page).then(renderMarkup);
  page += 1;
}
/* webformatURL - ссылка на маленькое изображение для списка карточек.
largeImageURL - ссылка на большое изображение.
tags - строка с описанием изображения. Подойдет для атрибута alt.
likes - количество лайков.
views - количество просмотров.
comments - количество комментариев.
downloads - количество загрузок.
 */
