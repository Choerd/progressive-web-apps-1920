const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 3000

app.use(express.static('static'))

app.set('view engine', 'ejs');
app.set('views', 'templates');

const apikey = `ebc313f38232bfbdaa36ea5a11721c5f`

app.get('/', async (req, res) => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`)
    const data = await response.json()
    const genres = data.genres

    res.render('home', {
        title: 'Genres',
        genres
    })
})

app.get('/genre/:id', async (req, res) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=popularity.desc&page=1&with_genres=${req.params.id}`)
    const data = await response.json()
    const movies = data.results

    res.render('movies', {
        title: 'Naam',
        movies
    })
})

app.get('/movie/:id', async (req, res) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${apikey}&language=en-US`)
    const data = await response.json()
    const movie = data

    console.log(movie)

    res.render('movie', {
        title: 'Naam',
        movie
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))