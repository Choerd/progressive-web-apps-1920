const fetcher = require('../modules/data.js')
const apikey = process.env.apikey

module.exports = async (req, res) => {
    const serie = await fetcher(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${apikey}`)

    res.render('serie', { serie })
}