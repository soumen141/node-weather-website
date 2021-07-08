const path = require('path')
const express = require('express')
const hbs = require('hbs')

const { geoCode } = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

const port = process.env.PORT || 3000;

//Defines path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Soumen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Soumen'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            
            res.send({
                location,
                forecast: forecastData,
                adrdress: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        errorMessage: 'About blog Not Found',
        title: '404',
        name: 'Soumen'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        title: '404',
        name: 'Soumen'
    })
})
app.listen(port, () => {
    console.log('Server is up on port '+port)
})