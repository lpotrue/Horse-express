const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Horse = require('../models/horse');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', { user : req.user });
});
router.get('/profile', (req, res) => {
    res.render('profile', { user : req.user });
});
router.post('/add-horse', (req, res) => {
    console.log('hello horse')
var h = new Horse({horsename: 'butter'})
h.save(function(err) {
        if (err)
           throw err;
        else 
           console.log('save user successfully...');
    });
    //Horse.create({horsename: 'buttercup2'})
    res.render('profile', { user : req.user });
})
router.get('/register', (req, res) => {
    res.render('register', { });
});

router.post('/register', (req, res, next) => {
    Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/profile');
            });
        });
    });
});


router.get('/login', (req, res) => {
    res.render('login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/profile');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/ping', (req, res) => {
    res.status(200).send("pong!");
});

module.exports = router;
