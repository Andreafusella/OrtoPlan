// const express = require('express');
// const path = require('path');

import express  from 'express';
import path from 'path'
import { Script } from 'vm';
const router = express.Router();

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/contattaci', (req, res) => {
    res.render('pages/contattaci')
});

app.get('/', (req, res) => {
    res.render('pages/intro');
});

app.get('/home', (req,res) => {
    res.render('pages/home')
})

app.get('/piante', (req,res) => {
    res.render('pages/piante');
})

app.get('/piantagione', (req, res) => {
    res.render('pages/piantagione');
})

app.get('/enterPiantagioni', (req, res) => {
    res.render('pages/enterPiantagioni');
})

app.get('/notifiche', (req, res) => {
    res.render('pages/notifiche');
})

app.get('/meteo', (req, res) => {
    res.render('pages/meteo');
})

app.get('/profilo', (req, res) => {
    res.render('pages/profilo');
})

app.get('/error404', (req, res) => {
    res.render('pages/error404');
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


