const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const serverMongo = process.env.SERVERMONGO || "mongodb://root:example@localhost:27017/";
const User = require('../../model/user')

router.get('/login', (req, res) => {
    res.render('users/login', { title: 'Авторизийруйтесь' })
})
router.get('/me', (req, res) => {
    if (req.isAuthenticated) {
        res.render('users/me')
    }
    res.json({ status: 'not auth' })
})
router.post('/login', async (req, res) => {
    const {username} = req.body
    try {
        const user = await User.find({username});
        res.json(user)
      } catch (error) {
        console.error(error);
      }
    // res.status(201)
    // res.json({ id: 1, mail: "test@mail.ru" })
    // res.redirect('/api/user/me')
})
router.post('/singup', async (req, res) => {
    // res.status(201)
    const { username, name, surname = '', email = '', password } = req.body
    const newUser = new User({ username, name, surname, email, password });
      try {
        await newUser.save();
      } catch (error) {
        console.error(error);
      }
    res.json({ username, name, surname, email, password })

})

module.exports = router