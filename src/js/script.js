{
  'use strict';

  const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf: {
      list: '.books-list',
    },
    book: {
      image: '.book__image',
      id: '.book__image[data-id]',
    },
    filter: {
      name: '.filter',
      value: '.nonFiction .adults',
      type: '.checkbox',
    },
  };

  const template = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),

  };

  class BooksList{
    constructor() {
      const thisBookList = this;

      thisBookList.filters = [];

      thisBookList.favoriteBooks = [];

      thisBookList.getElements();

      thisBookList.initData();

      thisBookList.initActions();

      thisBookList.useFilters();

    }

    initData() {
      const thisBookList = this;

      this.data = dataSource.books;

      for(let book of this.data){

        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);

        book.ratingWidth = book.rating * 10;

        const generatedHTML = template.booksList(book);

        thisBookList.element = utils.createDOMFromHTML(generatedHTML);

        thisBookList.booksList.appendChild(thisBookList.element);

      }
    }

    getElements(){
      const thisBookList = this;

      thisBookList.booksList = document.querySelector(select.containerOf.list);

      thisBookList.form = document.querySelector('.filters');

      thisBookList.rating = document.querySelector('.book__rating__fill');

    }

    initActions(){
      const thisBookList = this;

      thisBookList.form.addEventListener('click', function(event){

        if(event.target.nodeName == 'INPUT' && event.target.type == 'checkbox' && event.target.checked) {

          thisBookList.filters.push(event.target.value);

        } else {

          const indexOfChecked = thisBookList.filters.indexOf(event.target.value);
          thisBookList.filters.splice(indexOfChecked, 1);

        }
        thisBookList.useFilters();
      });

      const list = document.querySelector(select.containerOf.list);
      list.addEventListener('dblclick', function(event) {

        event.preventDefault();

        const book = event.target.closest('.book__image');

        // get book id from data-id
        const id = book.getAttribute('data-id');

        if(book && book.classList.contains('book__image') && !book.classList.contains('favorite')) {
          book.classList.add('favorite');


          // add that id to favoriteBooks
          thisBookList.favoriteBooks.push(id);

        } else {
          book.classList.remove('favorite');

          // remove id from favoriteBooks
          const indexOfId = thisBookList.favoriteBooks.indexOf(id);
          thisBookList.favoriteBooks.splice(indexOfId, 1);

        }
      });
    }

    useFilters(){
      const thisBookList = this;

      for (let book of this.data) {
        let shouldBeHidden = false;

        for(const filter of thisBookList.filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        const idBook = book.id;

        const dataId = document.querySelector('.book__image[data-id="' + idBook + '"]');

        if(shouldBeHidden) {

          dataId.classList.add('hidden');

        } else {
          dataId.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
      const thisBookList = this;

      let bgc = '';
        if(rating < 6){
          bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
        }
        if(rating > 6 && rating <= 8){
          bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
        }
        if(rating > 8 && rating <= 9){
          bgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
        }
        if(rating > 9){
          bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
        }
      return bgc;
    }

  }
  const app = new BooksList();

}
