const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// Display

function addBookToLibrary(title, author, pages, read = "unread") {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
}

addBookToLibrary("LOTR", "J.R.R Tolkein", 600)
addBookToLibrary("Dune", "Frank Herbert", 400)
addBookToLibrary("Mistborn", "Brandon Sanderson", 400)
addBookToLibrary("Harry Potter", "J.K. Rowling", 500)
addBookToLibrary("The Hobbit", "J.R.R Tolkein", 200)

function displayBooks() {
    myLibrary.forEach( appendBook )
}

function appendBook (element) {
    const books = document.querySelector("main .container .books")
    const card = document.createElement("div")
    card.classList.add("card")

    appendBookDetail(card, 'title', element.title)
    appendBookDetail(card, 'author', element.author)
    appendBookDetail(card, 'pages', element.pages)
    appendBookDetail(card, 'read', element.read)

    books.appendChild(card)
}

function appendBookDetail(card, name, value) {
    const detail = document.createElement("div")
    detail.classList.add(`${name}`)
    detail.textContent = `${value}`
    card.appendChild(detail)
}

displayBooks()