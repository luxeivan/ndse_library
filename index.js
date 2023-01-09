const express = require('express')
const { v4: uuid } = require('uuid');

const app = express()
app.use(express.json())
const PORT = process.env.port || 3000
app.listen(PORT)
class Book {
    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuid()) {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
    }
}
const books = []

app.post('/api/user/login', (req, res) => {
    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
})

app.get('/api/books', (req, res) => {
    res.json(books)
})
app.get('/api/books/:id', (req, res) => {
    const { id } = req.params
    const index = books.findIndex(item => item.id === id)
    if (index !== -1) {
        res.json(books[index])
    } else {
        res.status(404)
        res.json("not found book")
    }
})
app.post('/api/books', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
    books.push(newBook)
    res.json(newBook)
})
app.put('/api/books/:id', (req, res) => {
    const { id } = req.params
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const index = books.findIndex(item => item.id == id)
    if (index !== -1) {
        books[index] = {
            ...books[index], title, description, authors, favorite, fileCover, fileName
        }
        res.json(books[index])
    } else {
        res.status(404)
        res.json("not found book")
    }
})
app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params
    const index = books.findIndex(item => item.id == id)
    if (index !== -1) {
        books.splice(index,1)
        res.json("ok")
    } else {
        res.status(404)
        res.json("not found book")
    }
})
console.log(`Server start on port ${PORT}`)