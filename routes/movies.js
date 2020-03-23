const fetcher = require('../modules/data.js')
const apikey = process.env.apikey

module.exports = async (req, res) => {
    // Moviesdata
    const popular_movies = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`
    const upcoming_movies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`

    const movie_queries = Promise.all([
        await fetcher(popular_movies),
        await fetcher(upcoming_movies)
    ])
    const movies = await movie_queries

    // Render
    res.render('movies', {
        popular_movies: movies[0].results,
        upcoming_movies: movies[1].results
    })
}