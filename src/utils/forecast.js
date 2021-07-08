const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3871461f79c06090795cff1dae88152c&query=' + latitude + ',' + longitude + '&units=m';
    request({ url, json: true }, (error, { body }) => {
        const data = body.current;
        if (error) {
            callback('Unamble to connect to the Weather API', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out`)
        }

    })
}

module.exports = forecast;