const express = require('express')
const fetch = require('node-fetch')
const ejs = require('ejs')

const app = express()

app.get('/', async function (req, res) {
    const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q='
    const query = 'dieren'
    const key = '1e19898c87464e239192c8bfe422f280'
    const secret = '4289fec4e962a33118340c888699438d'
    const detail = 'Default'
    const url = `${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json`
    const config = {
        Authorization: `Bearer ${secret}`
    }

    fetch(url, config)
        .then(response => response)
        .then(data => console.log(JSON.parse(data)))
        .catch(err => console.log(err))

    // const response = await fetch(url, config)
    // const data = await response.json()

})

app.listen(3000)