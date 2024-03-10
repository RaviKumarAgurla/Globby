var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
const {checkForAuthenticationCookie} = require('./middlewares/authentication')
const cookieParser = require('cookie-parser')

var user = require('./models/user')
var userRouter = require('./routes/user')

var Blog = require('./models/blog')
var blogRouter = require('./routes/blog')

var Comment = require('./models/comment')

var app = express();
var PORT = 8000

mongoose.connect('mongodb://localhost:27017/Globby').then(console.log('mongoDB is connected'))

app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(express.static('./public'));

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


app.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    console.log(blogs)
    res.render('home', {
        user: req.user,
        blogs: blogs
    })
})

app.get('/:id', async (req, res) => {
    const id = req.params.id
    var blog = await Blog.findById(id).populate("createdBy")
    var comments = await Comment.find({attachedTo: id}).populate("commentedBy")
    console.log('comments', comments)
    console.log('populated blog', blog)
    res.render('blog', {
        user: req.user,
        blog,
        comments
    })
})
app.use('/user', userRouter)

app.use('/blog', blogRouter)

app.listen(PORT, () => console.log(`Server started at ${PORT}`))