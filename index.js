const express = require('express')
const book = require('./routes/books')
const user = require('./routes/user')
const error404 = require('./middleware/err404')

const PORT = process.env.port || 3000
const app = express()
app.use(express.json())

app.use('/public', express.static(__dirname+'/public'))
app.use('/api/user', user)
app.use('/api/books', book)
app.use(error404)

app.listen(PORT)
console.log(`Server start on port ${PORT}`)