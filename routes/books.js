const express = require('express')
const router = express.Router()
const storeBook = require('../store/books')
const fileMiddleware = require('../middleware/file');


router.get('/', (req, res) => {
    res.json(storeBook.books)
})
router.get('/:id/download',(req, res) => {
    const { id } = req.params
    const index = storeBook.books.findIndex(item => item.id == id)
    console.log(storeBook.books[index].fileBook)
    res.redirect(storeBook.books[index].fileBook);
})
router.get('/:id', (req, res) => {
    const { id } = req.params
    const index = storeBook.books.findIndex(item => item.id === id)
    if (index !== -1) {
        res.json(storeBook.books[index])
    } else {
        res.status(404)
        res.json({ errcode: 404, errmsg: "not found book" })
    }
})
router.post('/', fileMiddleware.single('fileBook'), (req, res) => {
    let fileBook = null
    console.log(req.file)
    if (req.file) {
        fileBook = req.file.path;
    }  
    if(fileBook){
        fileBook = '/'+fileBook.replaceAll('\\','/')
    }
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const newBook = new storeBook.classBook(title, description, authors, favorite, fileCover, fileName, fileBook)
    storeBook.books.push(newBook)
    res.json(newBook)
})
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const index = storeBook.books.findIndex(item => item.id == id)
    if (index !== -1) {
        storeBook.books[index] = {
            ...storeBook.books[index], title, description, authors, favorite, fileCover, fileName
        }
        res.json(storeBook.books[index])
    } else {
        res.status(404)
        res.json({ errcode: 404, errmsg: "not found book" })
    }
})
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const index = storeBook.books.findIndex(item => item.id == id)
    if (index !== -1) {
        storeBook.books.splice(index, 1)
        res.json("ok")
    } else {
        res.status(404)
        res.json({ errcode: 404, errmsg: "not found book" })
    }
})

module.exports = router