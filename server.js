require('dotenv').config()

const express = require('express')
const fetcher = require('./modules/data.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('src'))

app.set('view engine', 'ejs');
app.set('views', 'templates');

const apikey = process.env.apikey

app.get('/', async (req, res) => {
    const best_movie = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`
    const popular_movies = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`
    const upcoming_movies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`

    const queries = Promise.all([
        await fetcher(best_movie),
        await fetcher(popular_movies),
        await fetcher(upcoming_movies)
    ])
    const data = await queries

    const movieid = data[0].results[0].id
    const movie = await fetcher(`https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=${apikey}`)
    const best_movie_video = await movie

    console.log(data[0].results[0])

    res.render('home', {
        best_movie: data[0].results[0],
        best_movie_video: best_movie_video.results[0],
        popular_movies: data[1].results,
        upcoming_movies: data[2].results
    })
})

app.get('/movie/:id', async (req, res) => {
    const movie = await fetcher(`https://api.themoviedb.org/3/movie/118340?api_key=ebc313f38232bfbdaa36ea5a11721c5f`)

    res.render('movie', {
        movie
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))