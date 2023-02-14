const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const serverMongo = process.env.SERVERMONGO || "mongodb://root:example@localhost:27017/";
const User = require('../model/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('users/login', { title: 'Авторизийруйтесь', user: req.user })
})
router.get('/me', (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/api/user/login')
  }
  next()
}, (req, res) => {
  console.log(req.user)
  res.render('users/me', { user: req.user })
})
router.post('/login', passport.authenticate('local', { failureRedirect: '/api/user/login' }), (req, res) => {
  res.redirect('/api/user/me')
})
router.post('/singup', async (req, res) => {
  const { username, name, surname = '', email = '', password } = req.body
  const newUser = new User({ username, name, surname, email, password });
  try {
    await newUser.save();
  } catch (error) {
    console.error(error);
  }
  res.redirect('/api/user/me')
  // res.json({ username, name, surname, email, password })

})
router.get('/logout', (req, res) => {
  req.logout(function (error) {
    if (error) { console.error(error); }
    res.redirect('/');
  });
});

module.exports = router