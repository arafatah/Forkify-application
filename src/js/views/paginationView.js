import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    ); // 8 / 10 = 0.8 = 1 page
    console.log(numPages);
    // Page 1, and there are other pages
    // Page 1, and there are NO other pages
    // Last page
    // Other page
  }
}

export default new PaginationView();
