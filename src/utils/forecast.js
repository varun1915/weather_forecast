const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=28030e8ec507cadbffedebda4f72747e&query=" + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback("Unable to connect to weather service!", undefined);
        }else if(body.error){
            callback("Unable to find location!", undefined);
        }else{
            callback(undefined,{
                temperature: body.current.temperature,
                weather: body.current.weather_descriptions[0],
                rain: body.current.precip,
                windSpeed: body.current.wind_speed,
                humidity: body.current.humidity,
                visibility: body.current.visibility
            })
        }
    })
}

module.exports = {forecast};
