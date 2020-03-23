const fetcher = require('../modules/data.js')
const apikey = process.env.apikey

module.exports = async (req, res) => {
    // Seriesdata
    const discover_series = `https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&sort_by=popularity.desc&include_null_first_air_dates=false`
    const trending_series = `https://api.themoviedb.org/3/trending/tv/week?api_key=${apikey}`

    const serie_queries = Promise.all([
        await fetcher(discover_series),
        await fetcher(trending_series)
    ])
    const series = await serie_queries

    // Render
    res.render('series', {
        discover_series: series[0].results,
        trending_series: series[1].results
    })
}