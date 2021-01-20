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

    for(let book of favoriteBooks.bookImage) {
      book.addEventListener('dblclick', function(event){

        event.preventDefault();
        if(!book.classList.contains('favorite')) {
          book.classList.add('favorite');

          // get book id from data-id
          const id = book.getAttribute('data-id');

          // add that id to favoriteBooks
          favoriteBooks.id;

      } else {
        book.classList.remove('favorite');

        // remove id from favoriteBooks
        const indexOfId = favoriteBooks.indexOf('id');
        favoriteBooks.splice(indexOfId ,0);
      }
      });
    }

    console.log('image: ', favoriteBooks);
  }

  render();

  initActions();

}
