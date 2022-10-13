import refsList from './refs';
const throttle = require('lodash.throttle');

const refs = refsList();

document.addEventListener('scroll', throttle(btnVisibility, 250));

refs.scrollBtn.addEventListener('click', throttle(scrollToTop, 250));

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function btnVisibility() {
  if (window.scrollY > 400) {
    refs.scrollBtn.style.visibility = 'visible';
  } else {
    refs.scrollBtn.style.visibility = 'hidden';
  }
}
