const libraryData = document.getElementById("library-data");
const myLibrary = [];
const newBookBtn = document.getElementById("new-book");
const newBookForm = document.getElementById("add-new-book-popup");
const submitBtn = document.getElementById("submit-btn");

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

function addBookToLibrary(author, title, pages, hasBeenRead) {
  const book = new Book(author, title, pages, hasBeenRead);

  myLibrary.push(book);
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
