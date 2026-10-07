const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  console.log(
    `${this.title}. ${this.author}, ${this.pages} pages, ${this.readOrNot()}`,
  );
};

Book.prototype.readOrNot = function () {
  if (this.read) {
    return "You read this book !";
  } else {
    return "Not read yet !";
  }
};

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

const container = document.querySelector(".card-container");

function addBookToScreen() {
  container.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML += `
    <h1>${myLibrary[i].title}</h1>
    <p>${myLibrary[i].author}</p>
    <p>${myLibrary[i].pages} pages</p>
    <button class="toggle-read" data-id="${myLibrary[i].id}">${myLibrary[i].readOrNot()}</button>
    <button class="delete" data-id="${myLibrary[i].id}">test</button>
    `;
    container.appendChild(div);
  }
}

const form = document.querySelector("form");
const titleForm = document.querySelector("#title");
const authorForm = document.querySelector("#author");
const pagesForm = document.querySelector("#pages");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const read = document.querySelector('input[name="read"]:checked');
  addBookToLibrary(
    titleForm.value,
    authorForm.value,
    pagesForm.value,
    read.value,
  );
  addBookToScreen();
  form.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  addBookToLibrary("The Hobbit", "Tolkien", 310, true);
  addBookToLibrary("Harry Potter", "Rowling", 450, false);
  addBookToScreen();
  form.reset();
});

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const bookId = event.target.dataset.id;

    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id === bookId) {
        myLibrary.splice(i, 1);
        break;
      }
    }
  }
  addBookToScreen();

  if (event.target.classList.contains("toggle-read")) {
    const bookId = event.target.dataset.id;

    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id === bookId) {
        myLibrary[i].toggleRead();
        break;
      }
    }
    addBookToScreen();
  }
});

console.log(myLibrary);
