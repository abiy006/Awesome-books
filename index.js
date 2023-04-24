const body = document.getElementById('body');

const myH1 = document.createElement('h1');
myH1.textContent = 'Awsome Book';

const booksContainer = document.createElement('div');
booksContainer.className = 'booksContainer';

const hrLine = document.createElement('hr');

const myH2 = document.createElement('h2');
myH2.textContent = 'Add new Book';

const myForm = document.createElement('form');
myForm.setAttribute('id', 'form');
myForm.style.display = 'flex';
myForm.style.flexDirection = 'column';
myForm.style.gap = '1rem';
myForm.style.width = '20%';

const input1 = document.createElement('input');
input1.setAttribute('type', 'text');
input1.setAttribute('name', 'title');
input1.setAttribute('placeholder', 'Title');
input1.className = 'title';
const input2 = document.createElement('input');
input2.setAttribute('type', 'text');
input2.setAttribute('name', 'authore');
input2.setAttribute('placeholder', 'Authore');
input2.className = 'authore';
const button1 = document.createElement('button');
button1.type = 'submit';
button1.textContent = 'Add Book';

body.appendChild(myH1);
body.appendChild(booksContainer);
body.appendChild(hrLine);
body.appendChild(myH2);

myForm.appendChild(input1);
myForm.appendChild(input2);
myForm.appendChild(button1);

body.appendChild(myForm);

if (localStorage.getItem('Added Books') == null) {
  localStorage.setItem('Added Books', JSON.stringify([]));
}

let storeData = JSON.parse(localStorage.getItem('Added Books'));

function updateData() {
  localStorage.setItem('Added Books', JSON.stringify(storeData));
}

function removeBook(x) {
    const items = JSON.parse(localStorage.getItem('Added Books'));
    const index = x;
    items.splice(index, 1);
    localStorage.setItem('Added Books', JSON.stringify(items));
  
    storeData = JSON.parse(localStorage.getItem('Added Books'));
  
    createBooks(storeData);
  }

function createBooks(arr) {
  booksContainer.innerHTML = '';
  for (let i = 0; i < arr.length; i += 1) {
    const p1 = document.createElement('p');
    p1.textContent = arr[i].title;
    p1.style.width = '20%';
    const p2 = document.createElement('p');
    p2.textContent = arr[i].authore;
    p2.style.width = '20%';
    const button = document.createElement('input');
    button.setAttribute('class', 'remove-button');
    button.type = 'button';
    button.style.width = '20%';
    button.style.color = 'red';
    button.value = 'Remove';
    button.addEventListener('click', () => {
      removeBook(i);
    });
    const hr = document.createElement('hr');

    booksContainer.appendChild(p1);
    booksContainer.appendChild(p2);
    booksContainer.appendChild(button);
    booksContainer.appendChild(hr);
  }
}

function addNewdata(bookTitle, bookAuthore) {
  const Book = {
    title: bookTitle,
    authore: bookAuthore,
  };
  storeData.push(Book);
  updateData();
  createBooks(storeData);
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  const title = document.querySelector('.title');
  const authore = document.querySelector('.authore');
  e.preventDefault();
  addNewdata(title.value, authore.value);
});

// function displayBooks() {
//   createBooks(storeData);
//   }

window.onload = createBooks(storeData);
