var express = require('express')
var path = require('path')
var mongoose = require('mongoose')

var user = require('./models/user')
var userRouter = require('./routes/user')

var app = express();
var PORT = 8000

mongoose.connect('mongodb://localhost:27017/Globby').then(console.log('mongoDB is connected'))

app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


app.get('/', (req, res) => {
    res.render('home')
})

app.use('/user', userRouter)

app.listen(PORT, () => console.log(`Server started at ${PORT}`))