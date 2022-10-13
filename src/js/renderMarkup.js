import { Notify } from 'notiflix';
import refsList from './refs';
import { getPictures } from './fetchPictures';
import { searchWord, gallery } from './picturesSearch';
import { smoothScroll } from './smoothScroll';

const refs = refsList();
let page = 1;

refs.form.addEventListener('click', () => (page = 1));

export function renderMarkup(array) {
  if (array.length === 0 && page !== 1) {
    page = 1;
    refs.loadMoreBtn.style.display = 'none';
    refs.loadMoreBtn.removeEventListener('click', loadMorePictures);
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
  refs.loadMoreBtn.addEventListener('click', loadMorePictures);
  page += 1;
  return refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export async function loadMorePictures() {
  const search = await getPictures(searchWord, page);
  renderMarkup(search);
  gallery.refresh();
  smoothScroll();
}
