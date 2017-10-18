const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Horse = require('../models/horse');
const Entry = require('../models/entry');
const Image = require('../models/image');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' }).single('pic');
const router = express.Router();


/*
var express = require('express');
var fs = require('fs'); // file system, to save files
var request = require('request');
var url = require('url'); // to parse URL and separate filename from path
var progress = require('progress-stream'); // to have a progress bar during upload

*/

router.get('/', (req, res) => {
    console.log("homepage")
    Horse
    .find({})
    .exec()
    .then(horses => {
        
        res.render('index', { user : req.user,  horses: horses });
    })
    .catch(err => { console.error(err)});
    //res.render('index', { user : req.user });
});
router.get('/find', (req, res) => {
    Account
    .find({})
    .exec()
    .then(owners => {
        res.render('find', { user : req.user, owners: owners});
    })
    .catch(err => { console.error(err)});

    
});


router.get('/profile', (req, res) => {
    if(!req.user){
        return res.redirect("/")
    }
    Horse
    .find({owner: req.user._id})
    .exec()
    .then(horses => {
        res.render('profile', { user : req.user, horses: horses });
    })
    .catch(err => { console.error(err)});
    
});

router.get('/owner/:id', (req, res) => {
    if(!req.user){
        return res.redirect("/")
    }
    Horse
    .find({owner: req.params.id})
    .exec()
    .then(horses => {
        res.render('owner', { user : req.user, horses: horses });
    })
    .catch(err => { console.error(err)});
    
});

router.get('/entry/:id', (req, res) => {
    console.log("vanilla", req.params.id)
   
    Entry
    .findOne({_id: req.params.id})
    .exec()
    .then(entry => {
         res.render('entry', {entry: entry})
         console.log(entry)
    })
})



router.get('/horse/:id', (req, res) => {
    console.log("random horse", req.params)
    let horse = ''
    Horse
    .findOne({_id: req.params.id})
    .exec()
    .then(horse => {
        console.log(horse)
        horse = horse
        Entry
            .find({horse: req.params.id})
            .exec()
            .then(entries => {
                console.log(entries)
                res.render('horse', { user : req.user, horse: horse, entries: entries });
                res.end()
            })

            .catch(err => { console.error(err)});
            //res.render('horse', { user : req.user, horse: horse });
    })
    .catch(err => { console.error(err)});

})

router.post('/add-horse', (req, res) => {
    upload(req,res,function(err) {
        console.log('upload horse', req.body, req.user, req.files, req.file)
           if(err) {
           throw err;
           return res.end("Error uploading file.");
       }
       console.log("Louie", req.file)
       var h = new Horse({horsename: req.body.horsename, owner: req.user._id, images: [req.file.filename]})
        h.save(function(err) {
            if (err){
             throw (err);
         }
            else {console.log('save horse successfully...');} 
        });
       res.redirect('/profile')
    });
})

router.post('/horse/:id', (req, res) => {
    console.log(req.body)
    console.log('zebra')
    var o = new Entry({entry: req.body.entry, writtenBy: req.user._id, horse: req.params.id, stars: req.body.star, date: new Date()})
    o.save(function(err) {
        if (err){
         throw err;
        }
     else{console.log('save entry successfully...');}
         
 });
    res.redirect(`/horse/${req.params.id}`)


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

router.delete('/entry/:id', (req, res) => {
  console.log("kitty")
  //Entry.delete(req.params.id);
  Entry.findOne({'_id':req.params.id})
  .exec()
    .then(entry => {
     console.log(entry)
     //res.redirect('/')
     res.send({redirect: `/horse/${entry.horse}`});
     entry.remove()
    })
    .catch(err => { console.error(err)});
  console.log(`Deleted an entry`);
  //res.status(204).end();
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
