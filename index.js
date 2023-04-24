const title = document.querySelector('.title');
const author = document.querySelector('.author');
const add = document.querySelector('.add');
const booksDiv = document.querySelector('.booksDiv');

let arrayOfBooks = [];

if (localStorage.getItem('books')) {
  arrayOfBooks = JSON.parse(localStorage.getItem('books'));
}
function addElementsToPageFrom(arrayOfBooks) {
  booksDiv.innerHTML = '';

  arrayOfBooks.forEach((book) => {
    const div = document.createElement('div');
    div.className = 'book';

    div.setAttribute('data-id', book.id);
    const title = document.createElement('p');
    title.appendChild(document.createTextNode(book.title));
    div.appendChild(title);
    const author = document.createElement('p');
    author.appendChild(document.createTextNode(book.author));
    div.appendChild(author);
    // Create Delete Button
    const span = document.createElement('button');
    span.className = 'del';
    span.appendChild(document.createTextNode('Remove'));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks Container
    booksDiv.appendChild(div);
  });
}
function getDataFromLocalStorage() {
  const data = window.localStorage.getItem('books');
  if (data) {
    const books = JSON.parse(data);
    addElementsToPageFrom(books);
  }
}
getDataFromLocalStorage();

function addDataToLocalStorageFrom(arrayOfBooks) {
  window.localStorage.setItem('books', JSON.stringify(arrayOfBooks));
}

function deleteTaskWith(bookId) {
  arrayOfBooks = arrayOfBooks.filter((book) => book.id !== +bookId);
  addDataToLocalStorageFrom(arrayOfBooks);
}
function addBookToArray(title, author) {
  // Task Data
  const book = {
    id: Date.now(),
    title,
    author,
  };
    // Push Task To Array Of Tasks
  arrayOfBooks.push(book);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfBooks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfBooks);
}
add.onclick = function () {
  if (title.value !== '' && author.value !== '') {
    addBookToArray(title.value, author.value);
    title.value = '';
    author.value = '';
  }
};

booksDiv.addEventListener('click', (e) => {
  // Delete Button
  if (e.target.classList.contains('del')) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute('data-id'));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
});
