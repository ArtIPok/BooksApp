{
  'use strict';

  const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf: {
      list: '.books-list',
    },
  };

  const template = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),

  };

  function render() {
    //const thisBook = this;

    for(let book of dataSource.books){

      const generatedHTML = template.booksList(book);

      book.element = utils.createDOMFromHTML(generatedHTML);

      const booksList = document.querySelector(select.containerOf.list);

      booksList.appendChild(book.element);
    }

  }

  render();

}
