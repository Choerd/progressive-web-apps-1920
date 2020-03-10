const express = require('express')
const fetcher = require('./modules/data.js')

const app = express()
const port = 3000

app.use(express.static('src'))

app.set('view engine', 'ejs');
app.set('views', 'templates');

const apikey = `ebc313f38232bfbdaa36ea5a11721c5f`

app.get('/', async (req, res) => {
    const data = await fetcher(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`)
    const genres = data.genres

    res.render('home', {
        title: 'Genres',
        genres
    })
})

app.get('/genre/:id', async (req, res) => {
    const data = await fetcher(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=popularity.desc&page=1&with_genres=${req.params.id}`)
    const movies = data.results

    res.render('movies', {
        title: 'Categorie',
        movies
    })
})

app.get('/movie/:id', async (req, res) => {
    const movie = await fetcher(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${apikey}&language=en-US`)

    res.render('movie', {
        movie
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))