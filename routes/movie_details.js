const fetcher = require('../modules/data.js')
const apikey = process.env.apikey

module.exports = async (req, res) => {
    const movie = await fetcher(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${apikey}`)

    console.log(movie)

    res.render('movie', {
        movie
    })
}