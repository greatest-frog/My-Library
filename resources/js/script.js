let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(title, author, pages, read) {
    library.push(new Book(title, author, pages, read));
}

function createBook(bookG) {
    const book = document.createElement('div');
    book.id = `book-${Math.floor(Math.random()*10000000)}`;
    book.classList.add('book');
    const title = document.createElement('h4');
    title.textContent = bookG.title;
    book.append(title);
    const info = document.createElement('div');
    info.classList.add('info');
    const author = document.createElement('div');
    author.classList.add('author');
    author.textContent = bookG.author;
    info.appendChild(author);
    const pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = `${bookG.pages} pages`;
    info.appendChild(pages);
    const read = document.createElement('div');
    read.classList.add('read');
    read.textContent = bookG['read'];
    const change_read_button = document.createElement('button');
    change_read_button.classList.add('change_read_button');
    change_read_button.textContent = "Change status";
    change_read_button.addEventListener('click',() => {
        if (bookG['read'] === "Read") {
            bookG.read = "Not read";
            read.textContent = bookG['read'];
            read.appendChild(change_read_button);
        }
        else {
            bookG.read = "Read";
            read.textContent = bookG['read'];
            read.appendChild(change_read_button);
        }
    });
    read.appendChild(change_read_button);
    info.appendChild(read);
    book.appendChild(info);
    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('img');
    deleteIcon.src = "./resources/images/delete.png";
    deleteIcon.classList.add('delete_icon');
    deleteButton.appendChild(deleteIcon);
    deleteButton.classList.add('delete_button');
    deleteButton.addEventListener('click', () => deleteBook(book));
    book.appendChild(deleteButton);
    return book;
}

function deleteBook(book) {
    book.remove();
}

function displayLibrary() {
    const libraryRoot = document.querySelector('.library');
    for (let book of library) {
        libraryRoot.appendChild(createBook(book));
    }
}

function updateLibrary() {
    const libraryRoot = document.querySelector('.library');
    libraryRoot.append(createBook(library[library.length - 1]));
}

const new_book_btn = document.querySelector(".new_book_button");
const new_book_form = document.querySelector(".new_book_form");
const add_book_btn = document.querySelector('.add_book_button');

new_book_btn.addEventListener('click', () => {
    if (new_book_form.classList.contains('disabled')) {
        new_book_form.classList.remove('disabled');
    }
    else {
        new_book_form.classList.add('disabled');
    }
});

add_book_btn.addEventListener('click', () => {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');
    const not_read = document.getElementById('not_read');
    if (title.value && author.value && pages.value && (read.checked || not_read.checked)) {
        addBookToLibrary(title.value, author.value, pages.value, (read.checked) ? "Read": "Not read");
        updateLibrary();
    }
});

displayLibrary();