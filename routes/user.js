var {Router} = require('express')
var User = require('../models/user')

var router = Router();

router.get('/signup', (req, res) => {
    res.render('signup')
})


router.get('/signin', (req, res) => {
    res.render('signin')
})

router.post('/signup', async (req, res) => {
    console.log(req)
    var {fullName, email, password} = req.body
    var result = await User.create({
        fullName,
        email,
        password
    })
    res.redirect('/')
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    var user = await User.matchPassword(email, password)
    console.log(user)
    res.redirect('/')
})




module.exports = router