const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utilities/geocode');
const forecast = require('./utilities/forecast');

const app = express();

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views/');
const partialsPath = path.join(__dirname, '../templates/partials/');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directroy to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nay Lin'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nay Lin'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'This is help text.',
        title: 'Help',
        name: 'Nay Lin'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address.'
        });
    }
    geocode(req.query.address, (error, locationData) => {
        if(error) {
            return res.send({
                error: error
            });            
        }

        forecast(locationData.latitude, locationData.longitude, (error, foreCastData) => {
            if(error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                address: locationData.location,
                forecast: foreCastData
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        name: 'Nay Lin',
        title: '404'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        name: 'Nay Lin',
        title: '404'
    });
});

app.listen(process.env.PORT || 5000, () => {
  //  console.log('Server is up on port 3000.');
})