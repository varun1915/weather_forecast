const path = require('path')
const hbs = require('hbs');
const express = require('express')
const app = express()
const port = 3000

const { geocode } = require('./utils/geocode.js');
const { forecast } = require('./utils/forecast.js');

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
 
//**************** HOME ****************
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Varun Saini',
        text: 'Use this site to get your Weather!'
    });
})

//**************** ABOUT ****************
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Varun Saini'
    });
}) 

//**************** HELP ****************
app.get('/help', (req, res) => { 
    res.render('help', {
        title: 'Help',
        name: 'Varun Saini',
        helpText: 'Need Some Help?'
    });
})

//**************** WEATHER ****************
app.get('/weather', (req, res) => {
    if(!!!req.query.address){
        return res.send({
            error: "You must provide an address!"
        })
    }

    const address =  req.query.address;

    geocode(address, (error, { latitude, longitude, location } = { }) => {
        if(error){
            return res.send({ error });
        }
        
        forecast(latitude, longitude, (forecastError, forecastData) => {
            if(forecastError){
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: location, 
                address: req.query.address
            });
        });
    }) 
})

//***************** PRODUCTS ****************
app.get('/products', (req, res) => {
    if(!!!req.query.search){
        return res.send({
            error: "You must provide a search term!"
        })
    }
    res.send({
        products: []
    })
})

//?  * is for everything that is not mentioned in any of the above request
app.get('/help/*', (req, res) => {
    res.status('404').render('404',{
        title: 'My 404 Page',
        name: 'Varun Saini',
        Text404: 'Page Not Found!'
    });
}) 

app.get('*', (req, res) => {
    res.status('404').render('404',{
        title: 'My 404 Page',
        name: 'Varun Saini',
        Text404: 'Page Not Found!'
    });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

