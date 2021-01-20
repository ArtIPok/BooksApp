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
    },
  };

  const template = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),

  };

  const favoriteBooks = [];


  function render() {
    //const thisBook = this;

    for(let book of dataSource.books){

      const generatedHTML = template.booksList(book);

      book.element = utils.createDOMFromHTML(generatedHTML);

      const booksList = document.querySelector(select.containerOf.list);

      booksList.appendChild(book.element);
    }

  }

  function initActions(){
    favoriteBooks.bookImage = document.querySelectorAll(select.book.image);

    const booksList = document.querySelector(select.containerOf.list);

    console.log('lista book: ', booksList);
    for(let book in booksList){
      book.addEventListener('dblclick', function(event){

        event.preventDefault();

        book.classList.add('favorite');

        // get book id from data-id
        const id = getAttribute('data-id').id;

        // add that id to favoriteBooks
        favoriteBooks.id;

      });
    }

    console.log('image: ', favoriteBooks);
  }

  render();

  initActions();

}
