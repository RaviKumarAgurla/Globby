var {Schema, model, default: mongoose} = require('mongoose')


var blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
        unique: true
    },
    coverImage: {
        type: String,
        required: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {timestamps: true})

var blog = model('blog', blogSchema)

module.exports = blog