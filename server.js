require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 3000
const app = express()

// Static assets folder
app.use(express.static('static'))

// Declare template engine and path
app.set('view engine', 'ejs');
app.set('views', 'templates');

// Determain data per route
const home = require('./routes/home.js')
const detail = require('./routes/detail.js')
const offline = require('./routes/offline.js')

// Routes
app.get('/', async (req, res) => home(req, res))
app.get('/movie/:id', async (req, res) => detail(req, res))
app.get('/offline', (req, res) => offline(req, res))

app.listen(port, () => console.log(`Example app listening on port ${port}`))