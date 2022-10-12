import { Notify } from 'notiflix';
import { getPictures } from './fetchPictures';
import refsList from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = refsList();
let page = 1;
let searchWord = '';
let gallery = '';

refs.form.addEventListener('submit', onSubmitSearch);

function onSubmitSearch(e) {
  e.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';
  refs.footer.style.display = 'none';
  searchWord = e.currentTarget.elements.searchQuery.value;
  getPictures(searchWord, page)
    .then(renderMarkup)
    .then(() => {
      gallery = new SimpleLightbox('.gallery a');
    });
  refs.form.reset();
  refs.loadMoreBtn.addEventListener('click', loadMorePictures);
}

function renderMarkup(array) {
  if (array.length === 0 && page !== 1) {
    console.log(page);
    page = 1;
    return Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
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
        `<a class="gallery-link" href="${largeImageURL}"><div class="photo-card">
  <img src="${webformatURL}" alt=" ${tags}" width="315" height="208" loading="lazy" />
  
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views </b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads </b>${downloads}
    </p>
  </div>
</div></a>`
    )
    .join('');
  refs.loadMoreBtn.style.display = 'block';
  refs.footer.style.display = 'flex';
  page += 1;
  return refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function loadMorePictures() {
  getPictures(searchWord, page)
    .then(renderMarkup)
    .then(() => {
      gallery.destroy();
      gallery = new SimpleLightbox('.gallery a');
    });
}
