require('dotenv').config()
const express = require('express')
const minifyHTML = require('express-minify-html-2');
const port = process.env.PORT || 3000
const app = express()

app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}))

// Static assets folder
app.use(express.static('static'))

// Declare template engine and path
app.set('view engine', 'ejs');
app.set('views', 'templates');

// Determain data/content per route
const home = require('./routes/home.js')
const movies = require('./routes/movies.js')
const movie_details = require('./routes/movie_details.js')
const series = require('./routes/series.js')
const serie_details = require('./routes/serie_details.js')
const offline = require('./routes/offline.js')

// Routes
app
    .get('/', (req, res) => home(req, res))
    .get('/movies', (req, res) => movies(req, res))
    .get('/movie/:id', (req, res) => movie_details(req, res))
    .get('/series', (req, res) => series(req, res))
    .get('/serie/:id', (req, res) => serie_details(req, res))
    .get('/offline', (req, res) => offline(req, res))

    .listen(port, () => console.log(`Example app listening on port ${port}`))