const libraryData = document.getElementById("library-data");
const myLibrary = [];
const newBookBtn = document.getElementById("new-book");
const newBookForm = document.getElementById("add-new-book-popup");
const submitBtn = document.getElementById("submit-btn");
const editBookButtons = [];

// addEditButton("delete", '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>', deleteBook());

console.log(editBookButtons);

// Dummy books for testing purposes
addBookToLibrary("J.K. Rowling", "Harry Potter", "200", false);
renderBooks();

function Book(author, title, pages, hasBeenRead) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.hasBeenRead = hasBeenRead;
}

function EditButton(name, image, func) {
  this.name = name;
  this.image = image;
  this.func = func;
}

function addBookToLibrary(author, title, pages, hasBeenRead) {
  const book = new Book(author, title, pages, hasBeenRead);

  myLibrary.push(book);
}

function addEditButton(name, image, func) {
  const editBookButton = new EditButton(name, image, func);

  editBookButtons.push(editBookButton);
}

function renderBooks() {
  libraryData.innerHTML = "";

  for (let book of myLibrary) {
    let newRecord = document.createElement("tr");

    for (let key in book) {
      let bookData = document.createElement("td");
      bookData.textContent = book[key];
      newRecord.appendChild(bookData);
    }

    libraryData.appendChild(newRecord);
  }
}

newBookBtn.addEventListener("click", () => {
  newBookForm.showModal();
});

submitBtn.addEventListener("click", () => {
  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const pages = document.getElementById("pages").value;
  const hasBeenRead = document.querySelector(
    'input[name="has-been-read"]:checked',
  );

  console.log(author);
  console.log(title);
  console.log(pages);
  console.log(hasBeenRead);

  addBookToLibrary(author, title, pages, hasBeenRead);
  renderBooks();
});
