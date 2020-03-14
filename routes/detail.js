const fetcher = require('../modules/data.js')

module.exports = async (req, res) => {
    const movie = await fetcher(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=ebc313f38232bfbdaa36ea5a11721c5f`)

    res.render('movie', {
        movie
    })
}