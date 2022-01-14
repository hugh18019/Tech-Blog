const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('home', { logged_in: req.session.logged_in });
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {

  res.render('signup');
})

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
})


module.exports = router;
