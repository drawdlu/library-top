const myLibrary = [];

function Book(title, author, pages, status) {
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

// Display

function addBookToLibrary(title, author, pages, status = "unread") {
    let newBook = new Book(title, author, pages, status)
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

function appendBook (book) {
    const books = document.querySelector("main .container .books")
    const card = document.createElement("div")
    card.classList.add("card")

    appendBookDetail(card, 'title', book.title)
    appendBookDetail(card, 'author', book.author)
    appendBookDetail(card, 'pages', book.pages)
    appendBookDetail(card, 'status', book.status)

    const buttonDiv = createButtonDiv()
    card.appendChild(buttonDiv)
    appendDeleteButton(buttonDiv, book)
    appendToggleButton(buttonDiv, book)

    books.appendChild(card)
}

function createButtonDiv() {
    const buttonDiv = document.createElement("div")
    buttonDiv.classList.add("buttons")

    return buttonDiv
}

function appendDeleteButton(buttonDiv, book) {
    const button = createDeleteButton(book)
    addDeleteListener(button)
    buttonDiv.appendChild(button)
}

function appendToggleButton(buttonDiv, book) {
    const button = createToggleButton(book)
    addToggleListener(button)
    buttonDiv.appendChild(button)
}

function appendBookDetail(card, name, value) {
    const detail = document.createElement("div")
    detail.classList.add(`${name}`)
    detail.textContent = `${value}`
    card.appendChild(detail)
}

displayBooks()

// Create

const dialog = document.querySelector("dialog")
const showButton = document.querySelector(".create-book")
const bookForm = document.getElementById("book-form")

showButton.addEventListener("click", () => {
    dialog.showModal();
})

bookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(bookForm)
    const book = Object.fromEntries(formData.entries())
    addBookToLibrary(book.title, book.author, book.pages, book.status)
    appendBook(myLibrary.at(-1))
    dialog.close()
    bookForm.reset()
})

// Delete

function createDeleteButton(book) {
    const button = document.createElement("button")
    button.textContent = "Remove"
    button.classList.add("delete")
    button.dataset.id = book.id

    return button
}

function extractId(event) {
    return event.target.dataset.id
}

function getCardElement(event) {
    return event.target.parentElement.parentElement
}

function getParentElement(event) {
    return getCardElement(event).parentElement
}

function removeElement(event) {
    const card = getCardElement(event)
    const parent = getParentElement(event)
    parent.removeChild(card)
}

function removeFromLibrary(bookId) {
    const index = myLibrary.findIndex( book => book.id == bookId )
    myLibrary.splice(index, 1)
}

function addDeleteListener(button) {
    button.addEventListener('click', (e) => {
        removeFromLibrary(extractId(e))
        removeElement(e)
    })
}

// Toggle read status

Book.prototype.toggleStatus = function () {
    switch (this.status) {
        case "unread":
            this.status = "reading"
            break;
        case "reading":
            this.status = "read"
            break;
        default: 
            this.status = "unread"
            break;
    }
}

function createToggleButton(book) {
    const button = document.createElement("button")
    button.textContent = "Toggle Status"
    button.classList.add("toggle")
    button.dataset.id = book.id

    return button
}

function getBook(bookId) {
    const book = myLibrary.find( book => book.id == bookId)
    return book
}

function updatePageBookStatus(event, status) {
    const card = getCardElement(event)
    const statusElement = card.querySelector(".status")
    statusElement.textContent = status
}

function addToggleListener(button) {
    button.addEventListener('click', (e) => {
        const book = getBook(extractId(e))
        book.toggleStatus()
        updatePageBookStatus(e, book.status)
    })
}