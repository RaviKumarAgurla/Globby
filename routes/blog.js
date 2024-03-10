var {Router} = require('express')
var multer = require('multer')
var path = require('path')

const blog = require('../models/blog');
const Comment = require('../models/comment')

var router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads'))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now() + '-' + file.originalname}`
        cb(null, filename)
    }
  })

const upload = multer({ storage: storage })

router.get('/addBlog', (req, res) => {
    return res.render('addBlog', {
        user: req.user
    })
})


router.post('/', upload.single('coverImage'), async (req, res) => {
    var {title, body} = req.body
    console.log('req', req.user)
    var result = await blog.create({
        title,
        body,
        coverImage: `uploads/${req.file.filename}`,
        createdBy: req.user._id
    })
    return res.redirect('/')
})

router.post('/comment/:id', async (req, res) => {
    console.log('req user', req.user)
    console.log('req blog', req.blog)
    await Comment.create({
        content: req.body.comment,
        commentedBy: req.user._id,
        attachedTo: req.params.id
    })
    res.redirect(`/${req.params.id}`)
})

module.exports = router