const express = require('express')
const passport = require('passport')
const session = require('express-session')
const app = express()
const fs = require('fs')
const path = require('path')

app.set('view engine','hbs')
require('./auth')

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

app.use(session({secret: "cats",resave: false, saveUninitialized: true  }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/services',isLoggedIn,(req,res)=>{
    res.render('Services')
})


app.get('/',(req,res)=>{
    res.render('Home')
})

app.get('/auth/google',
    passport.authenticate('google', {scope: ['email','profile']})
)

app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
)

app.get('/auth/failure',(req,res)=>{
    res.render('Logout')
})

app.get('/protected',isLoggedIn,(req,res)=>{
    res.render('Logout')
})

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});
  
app.get('/logout',(req,res)=>{
    req.logout()
    req.session.destroy()
    res.render('Home')
})

app.listen(3000) 