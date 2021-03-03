
const request = require('request')

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=759c28d52d797d089a53d3b9ce8bf234&query=' + lat +',' + long

    request({url:url, json:true}, (error, response)=>{
        //json:true face ca response sa fie deja sub forma unui obiect, NU JSON
        if(error){
            callback("Connection problem", undefined)
        } else if (response.body.error){
            callback("Location not found", undefined)
        }else{
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees but it feels like ' + response.body.current.feelslike + ' and the chances of rain are ' + response.body.current.precip + '%.')
        }
  })  
}

  module.exports = forecast

