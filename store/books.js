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
    books: []
}