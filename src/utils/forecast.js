const request= require('request')

const forecast= (latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/13fe94f024e0d7e3f957d19cdc8533fd/'+latitude+','+longitude+'?units=si'
    request({url,json:true},(error,{body})=>{
        if(error)
            callback('unable to connect',undefined)
        else if(body.error)
            callback('location not found',undefined)
        else
            callback(undefined,"It is currently "+body.currently.temperature+" degrees out.There is a "+body.currently.precipProbability+"% chance of rain")        
    })
}
module.exports=forecast