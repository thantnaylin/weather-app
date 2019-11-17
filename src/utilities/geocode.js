const request = require('request');

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoidGhhbnRuYXlsaW4iLCJhIjoiY2p5a3ZwYmltMDF5dTNkbG02a29vZXlkYiJ9.JtSiPGXrh3CrOZg8znbKRQ&limit=1`;
    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location service.', undefined);
        } else if(body.features.length === 0) {
            callback('Cannot find the location. Try another search terms.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;