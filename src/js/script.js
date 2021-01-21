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

  const favoriteBooks = [];

  const filters = [];

  function render() {
    //const thisBook = this;

    for(let book of dataSource.books){

      const generatedHTML = template.booksList(book);

      book.element = utils.createDOMFromHTML(generatedHTML);

      const booksList = document.querySelector(select.containerOf.list);

      booksList.appendChild(book.element);

      const ratingBgc = determineRatingBgc(rating);

      const ratingWidth = book.rating * 10;

    }

  }

  const form = document.querySelector('.filters');


  console.log('form: ', form);


  function initActions(){
    favoriteBooks.bookImage = document.querySelectorAll(select.book.image);

    form.addEventListener('click', function(event){

      if(event.target.nodeName == 'INPUT' && event.target.type == 'checkbox' && event.target.checked) {

        filters.push(event.target.value);

        console.log('Filters after add: ', filters);

      } else {
        console.log('Filers before: ', filters);

        const indexOfChecked = filters.indexOf(event.target.value);
        filters.splice(indexOfChecked, 1);

        console.log('Filters after remove: ', filters);
      }

      useFilters();

    })

    document.querySelector(select.containerOf.list).addEventListener('dblclick', function(event) {

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
        console.log('Favorite list before: ', favoriteBooks);

        const indexOfId = favoriteBooks.indexOf(id);
        favoriteBooks.splice(indexOfId, 1);

        console.log('Favorite list after: ', favoriteBooks);

      }
    });

    console.log('image: ', favoriteBooks);
  }

  function useFilters(){
    for (let book of dataSource.books) {
      let shouldBeHidden = false;

      for(const filter of filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      };

      const idBook = book.id;
      console.log('id: ', idBook);


      if(shouldBeHidden != true) {

        const dataId = document.querySelector('.book__image[data-id="' + idBook + '"]');


        dataId.classList.add('hidden');

        console.log('div: ', dataId);
      } else {

        const dataId = document.querySelector('.book__image[data-id="' + idBook + '"]');

        dataId.classList.remove('hidden');
      }


    };
  };

  function determineRatingBgc(rating) {
    //const ratingBooks = book.rating;
    rating = document.querySelector('.book__rating__fill').getAttribute(style);
  };

  render();

  initActions();

}
