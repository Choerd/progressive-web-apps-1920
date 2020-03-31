require('dotenv').config()

const
    express = require('express'),
    compression = require('compression'),
    minifyHTML = require('express-minify-html-2'),
    port = process.env.PORT || 3000,
    app = express()

app
    .use(minifyHTML({
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
    .use(compression())

    // Static assets folder
    .use(express.static('static'))

    // Declare template engine and path
    .set('view engine', 'ejs')
    .set('views', 'templates')


// Determine data/content per route
const
    home = require('./routes/home.js'),
    movies = require('./routes/movies.js'),
    movie_details = require('./routes/movie_details.js'),
    series = require('./routes/series.js'),
    serie_details = require('./routes/serie_details.js'),
    offline = require('./routes/offline.js')


// Routes
app
    .get('/', (req, res) => home(req, res))
    .get('/movies', (req, res) => movies(req, res))
    .get('/movie/:id', (req, res) => movie_details(req, res))
    .get('/series', (req, res) => series(req, res))
    .get('/serie/:id', (req, res) => serie_details(req, res))
    .get('/offline', (req, res) => offline(req, res))

    .listen(port, () => console.log(`Using port: ${port}`))