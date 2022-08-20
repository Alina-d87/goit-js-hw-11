import axios from 'axios';

const DEFAULT_PAGE = 1;

let currentPage = DEFAULT_PAGE;
let per_page = 40;

export const resetPage = () => {
  currentPage = DEFAULT_PAGE;
};

export const fetchImg = async searchName => {
  const BASE_URL = `https://pixabay.com/api/`;
  const url = `${BASE_URL}?key=29356921-09a9859feda5f093f122dc700&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${per_page}`;
  try {
    const { data } = await axios.get(url);
    const dataImg = {
      img: data.hits,
      lastPage: currentPage > data.totalHits / per_page,
      totalHits: data.totalHits,
    };
    currentPage += 1;
    return dataImg;
  } catch (error) {
    console.log('error');
  }
};
