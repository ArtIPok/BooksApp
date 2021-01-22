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

      thisBookList.initData();

      thisBookList.getElements();

      thisBookList.initActions();

      thisBookList.useFilters();

      thisBookList.determineRatingBgc();

    }

    initData() {
      const thisBookList = this;

      this.data = dataSource.books;

      for(let book of this.data){

        const generatedHTML = template.booksList(book);

        thisBookList.element = utils.createDOMFromHTML(generatedHTML);

        const booksList = document.querySelector(select.containerOf.list);

        booksList.appendChild(thisBookList.element);
      }

    }

    getElements(){
      const thisBookList = this;

      //const hisBookListelement = document.querySelectorlAll(select.book.image);

      //thisBookList.element.booksList = thisBookList.document.querySelector(select.containerOf.list);

    //  thisBookList.form = thisBookList.document.querySelector('.filters');

    //  thisBookList.dataId = thisBookList.document.querySelector('.book__image[data-id="' + idBook + '"]');


    }

    initActions(){
      const thisBookList = this;
      const form = document.querySelector('.filters');

      form.addEventListener('click', function(event){

        if(event.target.nodeName == 'INPUT' && event.target.type == 'checkbox' && event.target.checked) {

          thisBookList.filters.push(event.target.value);

        } else {

          const indexOfChecked = thisBookList.filters.indexOf(event.target.value);
          thisBookList.filters.splice(indexOfChecked, 1);

        }
      });

      const list = document.querySelector(select.containerOf.list)
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
        let shouldBeHidden = true;

        for(const filter of thisBookList.filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        const idBook = book.id;

        if(shouldBeHidden != true) {
          const dataId = document.querySelector('.book__image[data-id="' + idBook + '"]');

          dataId.classList.add('hidden');

        } else {
          const dataId = document.querySelector('.book__image[data-id="' + idBook + '"]');

          dataId.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(){
      const thisBookList = this;

      //const ratingBooks = book.rating;
      //  rating = document.querySelector('.book__rating__fill').getAttribute(style);

    }

  }
  const app = new BooksList();
}
