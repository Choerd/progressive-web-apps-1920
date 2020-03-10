const fetch = require('node-fetch')

const fetcher = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

module.exports = fetcher

// const logger = {
//     info: () => { console.log('info') },
//     error: () => { console.log('error') }
// }

// module.exports = logger