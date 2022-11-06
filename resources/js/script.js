const library = new (class {
  #collection = [];
  addBookToLibrary = (title, author, pages, read) => {
    this.#collection.push(new Book(title, author, pages, read));
  };
  getCollection = () => {
    return this.#collection;
  };
  getLength = () => {
    return this.#collection.length;
  };
})();

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function displayBook(bookG) {
  const book = document.createElement("div");
  book.id = `book-${Math.floor(Math.random() * 10000000)}`;
  book.classList.add("book");
  const title = document.createElement("h4");
  title.textContent =
    bookG.title.length > 18 ? bookG.title.slice(0, 17) + "..." : bookG.title;
  book.append(title);
  const info = document.createElement("div");
  info.classList.add("info");
  const author = document.createElement("div");
  author.classList.add("author");
  author.textContent =
    bookG.author.length > 25 ? bookG.author.slice(0, 24) + "..." : bookG.author;
  info.appendChild(author);
  const pages = document.createElement("div");
  pages.classList.add("pages");
  pages.textContent = `${bookG.pages} pages`;
  info.appendChild(pages);
  const read = document.createElement("div");
  read.classList.add("read");
  read.textContent = bookG["read"];
  const change_read_button = document.createElement("button");
  change_read_button.classList.add("change_read_button");
  change_read_button.textContent = "Change status";
  change_read_button.addEventListener("click", () => {
    if (bookG["read"] === "Read") {
      bookG.read = "Not read";
      read.textContent = bookG["read"];
      read.appendChild(change_read_button);
    } else {
      bookG.read = "Read";
      read.textContent = bookG["read"];
      read.appendChild(change_read_button);
    }
  });
  read.appendChild(change_read_button);
  info.appendChild(read);
  book.appendChild(info);
  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./resources/images/delete.png";
  deleteIcon.classList.add("delete_icon");
  deleteButton.appendChild(deleteIcon);
  deleteButton.classList.add("delete_button");
  deleteButton.addEventListener("click", () => book.remove());
  book.appendChild(deleteButton);
  return book;
}

function updateLibrary() {
  const libraryRoot = document.querySelector(".library");
  libraryRoot.append(
    displayBook(library.getCollection()[library.getLength() - 1])
  );
}

const new_book_btn = document.querySelector(".new_book_button");
const new_book_form = document.querySelector(".new_book_form");
const add_book_btn = document.querySelector(".add_book_button");

new_book_btn.addEventListener("click", () => {
  if (new_book_form.classList.contains("disabled")) {
    new_book_form.classList.remove("disabled");
  } else {
    new_book_form.classList.add("disabled");
  }
});

add_book_btn.addEventListener("click", () => {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const read = document.getElementById("read");
  const not_read = document.getElementById("not_read");
  if (
    title.value &&
    author.value &&
    pages.value &&
    (read.checked || not_read.checked)
  ) {
    library.addBookToLibrary(
      title.value,
      author.value,
      pages.value,
      read.checked ? "Read" : "Not read"
    );
    updateLibrary();
  }
});

(function () {
  const libraryRoot = document.querySelector(".library");
  for (let book of library.getCollection()) {
    libraryRoot.appendChild(displayBook(book));
  }
})();
