const path= require('path')
const express= require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode.js')
const forecast= require('./utils/forecast.js')

const app= express()

//setup path for express config
console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const dirPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath= path.join(__dirname,'../templates/partials')

//static directory
app.use(express.static(dirPath))

//path for handler and view
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Unnati Dixit'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Unnati Dixit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        body:'You can ask for any help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('Please enter address')
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
          return console.log(error)
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
          if(error){
            return console.log(error)
          }
           res.send({
                address:req.query.address,
                location,
                forecast: forecastData

            })     
        })
    })
    
    
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please enter something to search'
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('*',(req,res)=>{
    res.render('error404',{
        title:'Error 404',
        errorMessage:'Page not Found'
    })
})

app.listen(3000,()=>{
    console.log('server is 3000')
})