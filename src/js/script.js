{
  'use strict';

const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf: {
      list: '.books-list .book',
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

    thisBookList.filtersBooks();

    thisBookList.determineRatingBgc();

  }

  initData() {
    const thisBookList = this;

    this.data = dataSource.books;

    for(let book of this.data){

      const generatedHTML = template.booksList(book);

      book.element = utils.createDOMFromHTML(generatedHTML);

      thisBookList.booksList.appendChild(book.element);
    }

  }

  getElements(){
    const thisBookList = this;

    //thisBookList.bookImage = thisBookList.document.querySelector('book__image');

    thisBookList.booksList = thisBookList.element.querySelector(select.containerOf.list);

    thisBookList.form = thisBookList.document.querySelector('.filters');

    thisBookList.list = thisBookList.element.querySelector(select.containerOf.list);

    thisBookList.dataId = thisBookList.document.querySelector('.book__image[data-id="' + idBook + '"]');


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

      useFilters();

    });

    thisBookList.list.addEventListener('dblclick', function(event) {

      event.preventDefault();

      const book = event.target.closest('.book__image');

      // get book id from data-id
      const id = book.getAttribute('data-id');

      console.log('id: ', id);

      if(book && book.classList.contains('book__image') && !book.classList.contains('favorite')) {
        book.classList.add('favorite');


        // add that id to favoriteBooks
        favoriteBooks.push(id);

      } else {
        book.classList.remove('favorite');

        // remove id from favoriteBooks
        const indexOfId = favoriteBooks.indexOf(id);
        favoriteBooks.splice(indexOfId, 1);

      }
    });
  }

  filtersBooks(){
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

      if(shouldBeHidden != true) {

        thisBookList.dataId.classList.add('hidden');

      } else {

        thisBookList.dataId.classList.remove('hidden');
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
