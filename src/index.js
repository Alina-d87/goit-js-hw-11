import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchImg, resetPage } from './fetchImages';

const refs = {
  form: document.querySelector('.search-form'),
  inputName: document.querySelector('input'),
  listGallery: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.load-more'),
};

let searchName = '';

refs.form.addEventListener('submit', onSearchForm);
refs.btnLoad.addEventListener('click', onLoad);

refs.btnLoad.classList.add('is-visible');

async function onSearchForm(e) {
  e.preventDefault();
  try {
    searchName = refs.inputName.value.trim();
    if (searchName === '') {
      clearInput();
      return;
    }
    clearInput();

    resetPage();

    const dataImg = await fetchImg(searchName);
    const { img, totalHits, lastPage } = dataImg;

    refs.btnLoad.classList.remove('is-visible');
    if (lastPage) {
      refs.btnLoad.classList.add('is-visible');
    }
    if (img.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    refs.listGallery.innerHTML = imgCart(img);
  } catch (error) {
    console.log('error');
  }
}

async function onLoad() {
  try {
    const dataImg = await fetchImg(searchName);
    const { img, totalHits, lastPage } = dataImg;
    refs.btnLoad.classList.remove('is-visible');
    if (lastPage) {
      refs.btnLoad.classList.add('is-visible');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    refs.listGallery.insertAdjacentHTML('beforeend', imgCart(img));
  } catch (error) {
    console.log('error');
  }
}

const imgCart = item => {
  return item
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes:<br>${likes}</br></b>
      </p>
      <p class="info-item">
        <b>Views:<br>${views}</br></b>
      </p>
      <p class="info-item">
        <b>Comments:<br>${comments}</br></b>
      </p>
      <p class="info-item">
        <b>Downloads:<br>${downloads}</br></b>
      </p>
    </div>
</div>`
    )
    .join('');
};

function clearInput() {
  refs.listGallery.innerHTML = '';
}
