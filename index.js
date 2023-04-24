const title = document.querySelector('.title');
const author = document.querySelector('.author');
const add = document.querySelector('.add');
const booksDiv = document.querySelector('.booksDiv');

let arrayOfBooks = [];

if (localStorage.getItem("books")) {
    arrayOfBooks = JSON.parse(localStorage.getItem("books"));
  }

getDataFromLocalStorage();

add.onclick = function () {
    if(title.value !== '' && author.value !== '') {
        addBookToArray(title.value, author.value);
        title.value = '';
        author.value = '';
    }
}

booksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
      // Remove Task From Local Storage
      deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
      // Remove Element From Page
      e.target.parentElement.remove();
    }
    // Task Element
    
  });
  function addBookToArray(title, author) {
    // Task Data
    const book = {
      id: Date.now(),
      title: title,
      author : author
    };
    // Push Task To Array Of Tasks
    arrayOfBooks.push(book);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfBooks);
    // Add Tasks To Local Storage
    addDataToLocalStorageFrom(arrayOfBooks);
  }
  function addElementsToPageFrom(arrayOfBooks) {
    // Empty Tasks Div
    booksDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfBooks.forEach((book) => {
      // Create Main Div
      let div = document.createElement("div");
      div.className = "book";
           
      div.setAttribute("data-id", book.id);
     const title = document.createElement('p');
     title.appendChild(document.createTextNode(book.title));
     div.appendChild(title);
     const author = document.createElement('p');
     author.appendChild(document.createTextNode(book.author));
     div.appendChild(author);
      // Create Delete Button
      let span = document.createElement("button");
      span.className = "del";
      span.appendChild(document.createTextNode("Remove"));
      // Append Button To Main Div
      div.appendChild(span);
      // Add Task Div To Tasks Container
      booksDiv.appendChild(div);
    });
  }
  function addDataToLocalStorageFrom(arrayOfBooks) {
    window.localStorage.setItem("books", JSON.stringify(arrayOfBooks));
  }

  function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("books");
    if (data) {
      let books = JSON.parse(data);
      addElementsToPageFrom(books);
    }
  }
  function deleteTaskWith(bookId) {
    
    arrayOfBooks = arrayOfBooks.filter((book) => book.id != bookId);
    addDataToLocalStorageFrom(arrayOfBooks);
  }