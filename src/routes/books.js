const express = require('express')
const router = express.Router()
const storeBook = require('../store/books')
const fileMiddleware = require('../middleware/file');
const serverCounter = process.env.SERVERCOUNTER || 'http://localhost:3001'
const axios = require('axios')


router.get('/', (req, res) => {
    // res.json(storeBook.books)
    // console.log(storeBook.books)
    res.render('books/index', { books: storeBook.books, title: "Библиотека" })
})
router.get('/:id/download', (req, res) => {
    const { id } = req.params
    const index = storeBook.books.findIndex(item => item.id == id)
    console.log(storeBook.books[index].fileBook)
    // res.redirect(storeBook.books[index].fileBook);
    res.download(storeBook.books[index].fileBook)
})
router.get('/book/:id', (req, res) => {
    const { id } = req.params
    const index = storeBook.books.findIndex(item => item.id === id)
    if (index !== -1) {
        //res.json(storeBook.books[index])
        let count = 0
        axios.get(serverCounter + `/counter/${id}`)
            .then(function (response) {
                // handle success
                console.log(response.data);
                if (response.data) {
                    count = response.data
                }
                res.render('books/view', { book: storeBook.books[index], title: storeBook.books[index].title, count: count })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        axios.post(serverCounter + `/counter/${id}/incr`)
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    } else {
        res.status(404)
        // res.json({ errcode: 404, errmsg: "not found book" })
        res.render('404', { title: "Книга не найдена" })
    }
})
router.get('/create', (req, res) => {
    // res.json(storeBook.books)
    res.render('books/create', { title: "Создать книгу" })
})
router.post('/create', fileMiddleware.single('fileBook'), (req, res) => {
    let fileBook = null
    //console.log(req)
    if (req.file) {
        fileBook = req.file.path;
    }
    if (fileBook) {
        fileBook = fileBook.replaceAll('\\', '/')
    }
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const newBook = new storeBook.classBook(title, description, authors, favorite, fileCover, fileName, fileBook)
    storeBook.books.push(newBook)
    res.redirect('/books')
})
router.get('/update/:id', (req, res) => {
    // res.json(storeBook.books)
    const { id } = req.params
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const index = storeBook.books.findIndex(item => item.id == id)
    if (index !== -1) {
        //res.json(storeBook.books[index])
        res.render('books/update', { book: storeBook.books[index], title: "Редактировать книгу" })
    } else {
        res.status(404)
        //res.json({ errcode: 404, errmsg: "not found book" })
        res.render('404', { title: "Книга не найдена" })
    }
})
router.post('/update/:id', fileMiddleware.single('fileBook'), (req, res) => {
    let fileBook = null
    if (req.file) {
        fileBook = req.file.path;
    }
    if (fileBook) {
        fileBook = fileBook.replaceAll('\\', '/')
    }
    const { id } = req.params
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const index = storeBook.books.findIndex(item => item.id == id)
    if (index !== -1) {
        storeBook.books[index] = {
            ...storeBook.books[index], title, description, authors, favorite, fileCover, fileName, fileBook
        }
        // res.json(storeBook.books[index])
        res.redirect(`/books`)
    } else {
        res.status(404)
        //res.json({ errcode: 404, errmsg: "not found book" })
        res.render('404', { title: "Книга не найдена" })
    }
})
router.post('/delete/:id', (req, res) => {
    const { id } = req.params
    const index = storeBook.books.findIndex(item => item.id == id)
    if (index !== -1) {
        storeBook.books.splice(index, 1)
        // res.json("ok")
        res.redirect('/books')
    } else {
        res.status(404)
        // res.json({ errcode: 404, errmsg: "not found book" })
        res.render('404', { title: "Книга не найдена" })
    }
})

module.exports = router