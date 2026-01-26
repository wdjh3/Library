const libraryData = document.getElementById("library-data");
let myLibrary = [];
const newBookBtn = document.getElementById("new-book");
const newBookFormPopup = document.getElementById("add-new-book-popup");
const submitBtn = document.getElementById("submit-btn");
const newBookForm = document.getElementById("new-book-form");

class Book {
  constructor(author, title, pages, hasBeenRead) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
  }

  toggleRead = () => {
    this.hasBeenRead = !this.hasBeenRead;
  };
}

// Dummy books for testing purposes
addBookToLibrary("J.K. Rowling", "Harry Potter", "200", false);
renderBooks();

function addBookToLibrary(author, title, pages, hasBeenRead) {
  const book = new Book(author, title, pages, hasBeenRead);

  myLibrary.push(book);
}

function renderBooks() {
  libraryData.innerHTML = "";

  for (let book of myLibrary) {
    let newRecord = document.createElement("tr");

    for (let key in book) {
      if (typeof book[key] === "function") {
        continue;
      }
      let bookData = document.createElement("td");
      bookData.textContent = book[key];
      newRecord.appendChild(bookData);
    }

    addEditButton(
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>',
      deleteBook,
      book,
      newRecord,
    );

    addEditButton(
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m438-400 198-198-57-56-141 141-57-57-57 57 114 113ZM200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>',
      toggleBookRead,
      book,
      newRecord,
    );

    libraryData.appendChild(newRecord);
  }
}

function addEditButton(imageHTML, func, book, newRecord) {
  let editButtonContainer = document.createElement("td");
  let editButton = document.createElement("button");
  editButton.dataset.id = book.id;
  editButton.innerHTML = imageHTML;
  editButton.addEventListener("click", func);
  editButtonContainer.appendChild(editButton);
  newRecord.appendChild(editButtonContainer);
}

newBookBtn.addEventListener("click", () => {
  newBookFormPopup.showModal();
});

function toggleBookRead(e) {
  let book = myLibrary.filter(
    (book) => book.id === e.currentTarget.dataset.id,
  )[0];
  console.log(book);
  book.toggleRead();
  console.log(book);
  renderBooks();
}

function deleteBook(e) {
  console.log("deleting book");
  console.log(e.currentTarget.dataset.id);
  myLibrary = myLibrary.filter(
    (book) => book.id !== e.currentTarget.dataset.id,
  );
  renderBooks();
}

submitBtn.addEventListener("click", () => {
  event.preventDefault();
  if (!newBookForm.checkValidity()) {
    newBookForm.reportValidity();
    return;
  }
  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const pages = document.getElementById("pages").value;
  const hasBeenRead =
    document.querySelector('input[name="has-been-read"]:checked').id ===
    "has-been-read"
      ? true
      : false;

  console.log(author);
  console.log(title);
  console.log(pages);
  console.log(hasBeenRead);

  addBookToLibrary(author, title, pages, hasBeenRead);
  renderBooks();
});
