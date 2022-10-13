import { getPictures } from './fetchPictures';
import refsList from './refs';
import { renderMarkup, loadMorePictures } from './renderMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = refsList();
export let searchWord = '';
export let gallery = '';
let page = 1;

refs.form.addEventListener('submit', onSubmitSearch);

async function onSubmitSearch(e) {
  e.preventDefault();
  galleryClean();
  refs.loadMoreBtn.removeEventListener('click', loadMorePictures);
  searchWord = e.currentTarget.elements.searchQuery.value;
  const search = await getPictures(searchWord, page);
  renderMarkup(search);
  gallery = new SimpleLightbox('.gallery a');
  refs.form.reset();
}

function galleryClean() {
  page = 1;
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';
  refs.footer.style.display = 'none';
}
