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

function appendBook (element) {
    const books = document.querySelector("main .container .books")
    const card = document.createElement("div")
    card.classList.add("card")

    appendBookDetail(card, 'title', element.title)
    appendBookDetail(card, 'author', element.author)
    appendBookDetail(card, 'pages', element.pages)
    appendBookDetail(card, 'status', element.status)
    const button = createDeleteButton(element)
    addDeleteListener(button)
    card.appendChild(button)

    books.appendChild(card)
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
const showButton = document.querySelector("dialog + button")
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

function createDeleteButton(element) {
    const button = document.createElement("button")
    button.textContent = "Remove"
    button.dataset.id = element.id

    return button
}

function extractID(event) {
    return event.target.dataset.id
}

function getCardElement(event) {
    return event.target.parentElement
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
        removeFromLibrary(extractID(e))
        removeElement(e)
    })
}