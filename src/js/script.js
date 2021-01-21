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
    }

  }

  const form = document.querySelector('.filters');

  const div = document.getElementsByName('type').getAttribute;


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

    })
    // for(let book of favoriteBooks.bookImage) {

    document.querySelector(select.containerOf.list).addEventListener('dblclick', function(event) {

      event.preventDefault();


      // get book id from data-id
      const id = event.target.getAttribute('data-id');

      if(event.target && event.target.classList.contains('book__image') && !event.target.classList.contains('favorite')) {
        event.target.classList.add('favorite');


        // add that id to favoriteBooks
        favoriteBooks.push(id);

      } else {
        event.target.classList.remove('favorite');

        // remove id from favoriteBooks
        // console.log('Favorite list: ', favoriteBooks);

        const indexOfId = favoriteBooks.indexOf(id);
        favoriteBooks.splice(indexOfId, 1);

        // console.log('Favorite list: ', favoriteBooks);

      }
    });

    console.log('image: ', favoriteBooks);
  }

  render();

  initActions();

}
