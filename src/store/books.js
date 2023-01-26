const { v4: uuid } = require('uuid');
module.exports = {
    classBook: class Book {
        constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", fileBook = "", id = uuid()) {
            this.id = id
            this.title = title
            this.description = description
            this.authors = authors
            this.favorite = favorite
            this.fileCover = fileCover
            this.fileName = fileName
            this.fileBook = fileBook
        }
    },
    books: [{
        id: "123456",
        title: "первая книга",
        description: "это тестовая книга",
        authors: "Народ",
        favorite: "Тратата",
        fileCover: "https://avatars.mds.yandex.net/get-marketpic/5393578/pic12fd06680734fa83cc2211e46f927dcf/orig",
        fileName: "Не понятно что здесь",
        fileBook: "/app/public/books/1673620151211-c16846589ae06b5d3e967afa468bc2ab_2c9bbd70bc.pdf"
    }]
}