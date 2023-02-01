const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
// const storeBook = require('../store/books')
const fileMiddleware = require('../middleware/file');
const serverMongo = process.env.SERVERMONGO || 'mongodb://root:example@mongo:27017/'
const axios = require('axios');
const Book = require('../../model/book');

mongoose.connect(serverMongo)


router.get('/', async (req, res) => {
    try {
        const books = await Book.find()
        res.render('books/index', { books, title: "Библиотека" })
    } catch (error) {
        console.error(error)
    }
})
router.get('/:id/download', async (req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findById(id)
        console.log(book)
        console.log('-------------------')
        console.log(book.fileName)
        res.download(book.fileName)

    } catch (error) {
        console.error(error)
    }
})
router.get('/book/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findById(id)
        if (book) {
            res.render('books/view', { book, title: book.title })
        } else {
            res.status(404)
            res.render('404', { title: "Книга не найдена" })
        }
    } catch (error) {
        console.error(error)
    }
})
router.get('/create', async (req, res) => {
    res.render('books/create', { title: "Создать книгу" })
})
router.post('/create', fileMiddleware.single('fileBook'), async (req, res) => {
    let fileBook = null
    if (req.file) {
        fileBook = req.file.path;
    }
    if (fileBook) {
        fileBook = fileBook.replaceAll('\\', '/')
    }
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const newBook = new Book({ title, description, authors, favorite, fileCover, fileName: fileBook })
    try {
        await newBook.save()
    } catch (error) {
        console.error(error)
    }
    res.redirect('/books')
})
router.get('/update/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findById(id)
        if (book) {
            res.render('books/update', { book, title: "Редактировать книгу" })
        } else {
            res.status(404)
            res.render('404', { title: "Книга не найдена" })
        }
    } catch (error) {
        console.error(error)
    }
})
router.post('/update/:id', fileMiddleware.single('fileBook'), async (req, res) => {
    let fileBook = null
    if (req.file) {
        fileBook = req.file.path;
    }
    if (fileBook) {
        fileBook = fileBook.replaceAll('\\', '/')
    }
    const { id } = req.params
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    try {
        const book = await Book.findById(id)
        if (book) {
            try {
                if (fileBook) {
                    await Book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName: fileBook })
                } else {
                    await Book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover})

                }
                res.redirect(`/books`)
            } catch (error) {
                console.error(error)
            }
        } else {
            res.status(404)
            res.render('404', { title: "Книга не найдена" })
        }
    } catch (error) {
        console.error(error)
    }
})
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findById(id)
        if (book) {
            await Book.deleteOne({ _id: id })
            res.redirect('/books')
        } else {
            res.status(404)
            res.render('404', { title: "Книга не найдена" })
        }
    } catch (error) {
        console.error(error)
    }
})

module.exports = router