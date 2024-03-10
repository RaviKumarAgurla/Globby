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
    try {
        var token = await User.matchPasswordGenerateToken(email, password)
        return res.cookie('token', token).redirect('/')
    }catch(e) {
        console.log(e)
        return res.render('signin',{
            error: 'user not found'
        })
    }
    
})

router.get('/logout', (req, res) => {
    return res.clearCookie('token').render('signin')
})




module.exports = router