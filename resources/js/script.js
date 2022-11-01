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
    read.textContent = (bookG['read']) ? "Read" : "Not read";
    info.appendChild(read);
    book.appendChild(info);
    return book;
}


function displayLibrary() {
    const libraryRoot = document.querySelector('.library');
    for (let book of library) {
        libraryRoot.appendChild(createBook(book));
    }
}

displayLibrary();