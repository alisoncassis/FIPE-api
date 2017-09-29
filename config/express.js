const path = require('path')
const cors = require('cors')
const axios = require('axios')
const express = require('express')
const app = express()
const plateUrl = 'http://placa-wgenial.rhcloud.com/'

app.use(cors())
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')))

app.get('/api/plate/:plate', (req, res) => {
    axios.get(plateUrl + req.params.plate)
        .then(resp => res.send(resp.data))
        .catch(err => console.log(err))
})

module.exports = app
