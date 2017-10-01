const path = require('path')
// const cors = require('cors')
const axios = require('axios')
const express = require('express')
const app = express()
const plateUrl = 'http://placa-wgenial.rhcloud.com/'

// app.use(cors())
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')))

app.get('/api/plates/:plate', (req, res) => {
    axios.get(plateUrl + req.params.plate)
        .then(resp => res.send(resp.data))
        .catch(err => console.log(err))
})

app.get('/api/brands', (req, res) => {
    axios.get('http://fipeapi.appspot.com/api/1/carros/marcas.json')
        .then(resp => {
            const brands = []
            resp.data.forEach(brand => brands.push({id: brand.id, name: brand.name}))
            res.send(brands)
        })
        .catch(err => console.log(err))
})

app.get('/api/models', (req, res) => {
    axios.get(`http://fipeapi.appspot.com/api/1/carros/veiculos/${req.query.brand}.json`)
        .then(resp => {
            const models = []
            resp.data.forEach(model => models.push({id: model.id, name: model.name}))
            res.send(models)
        })
        .catch(err => console.log(err))
})

module.exports = app
