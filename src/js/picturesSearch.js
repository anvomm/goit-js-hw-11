import { getPictures } from './fetchPictures';
import refsList from './refs';
import { renderMarkup, loadMorePictures } from './renderMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';

const refs = refsList();
export let searchWord = '';
export let gallery = '';
let page = 1;

refs.form.addEventListener('submit', onSubmitSearch);

async function onSubmitSearch(e) {
  e.preventDefault();
  galleryClean();
  refs.loadMoreBtn.removeEventListener('click', loadMorePictures);
  searchWord = e.target.elements.searchQuery.value;
  if (searchWord === '' || searchWord.match(/^\s+$/)) {
    return Notify.warning('Your search should contain any letter');
  }
  const search = await getPictures(searchWord, page);
  renderMarkup(search);
  gallery = new SimpleLightbox('.gallery a');
  gallery.on('show.simplelightbox', () => {
    if (window.scrollY > 400) {
      refs.scrollBtn.style.visibility = 'visible';
    } else {
      refs.scrollBtn.style.visibility = 'hidden';
    }
  });
  refs.form.reset();
}

function galleryClean() {
  page = 1;
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';
  refs.footer.style.display = 'none';
}
