const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/05b4e0c172ac981907a131915a7d4875/${latitude},${longitude}`;
    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined);
        } else if(body.error) {
            callback('Cannot find the location.', undefined);
        } else {
            callback(undefined,`${body.currently.summary}. It is ${body.currently.temperature} degrees out. There is a ${body.currently.humidity}% chance of raining.`);
            //callback(response.body.currently);
        }
    });
};

module.exports = forecast; 