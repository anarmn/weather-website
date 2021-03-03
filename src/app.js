const path = require('path') //core node module
const express = require('express')
const hbs = require('hbs')
const { runInNewContext } = require('vm')
//modulul express este o singura functie, app cu mai multe metode

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname) //path-ul de la directorul in care se afla fisierul
console.log(__filename) //path-ul de la fisierul curent


//ne imaginam ca avem domeniul app.com si totul va rula pe un singur server web
//app.com/help sau app.com/about sunt rute si putem avea mai multe


const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') //c-un punct iesi, cu-n punct intri, se printeaza D:\Facultate\Licenta\Curs Node\web-server\templates\partials



app.use(express.static(publicDirectoryPath)) //asta tine loc de app.get('', etc)
//din about, fisierul html numit index.html va fi pe ruta principala
//restul vor fi pe /numele fisierului


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me ',
        name: 'Ana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ana',
        message: 'This is a helpful text'
    })
})

app.get('/weather', (req, res) =>{
    //obiectul req are proprietatea query care 
    //e si ea un obiect care este parsat de express si => un ob cu perechi cheie valoare gen search: 'games'
    if (!req.query.adress){
        return res.send({
            error: "you must provide an adress"
        })
    }
        
    geoCode(req.query.adress, (error, data)=> {
        if (error) {
            return res.send({errorText: error})
        } 

       forecast(data.lat, data.long, (error, forecastData) => {
           if (error){
                return res.send({error})
           }
           res.send({
            forecast: forecastData,
            location: data.location,
            adress: req.query.adress
        })
         })
    })
    



 
    
    //ATENTIE: requesturile http trimit UN SINGUR request catre server si trimit inapoi un singur response


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'you must provide a search term'
        })
    }
    res.send({
        forecast: "It is snowing",
        location: "Philadelphia"
    })
 
})


app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: 'Error',
        name: 'Ana',
        messageError: 'Help article not found'
    })
})

//pt orice nu se potriveste cu rutele de mai sus
//mereu se scrie ultimul
app.get('*', (req, res)=> {
    res.render('404', {
        title: 'Error',
        name: 'Ana',
        messageError: 'Page not found. Sorry!'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000')
}) 