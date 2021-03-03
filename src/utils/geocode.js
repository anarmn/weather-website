const request = require('request')

//geocoding = convertirea din numele unei locatii in pereche longitudine, latitudine
//adrress ->api-> Lat/Long -> Weather


const geoCode = (adress, callback) =>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(adress)+ '.json?access_token=pk.eyJ1IjoiYW5hcm1uIiwiYSI6ImNrZ2NhbWMzODA3cmUyc252enBtNzNocGoifQ.wPGfrXuPHmK0cQ2V7yUCRQ'
    request({url:url, json:true}, (error, response)=>{
        if (error){
            callback('Connection problem', undefined)
         }else if (response.body.features.length===0){
            callback('No matches found', undefined)
            }else {
                callback(undefined, {
                 lat : response.body.features[0].center[1],
                 long : response.body.features[0].center[0],
                 location :response.body.features[0].place_name
                })
            }
    })
 }

 module.exports = geoCode