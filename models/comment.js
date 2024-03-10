var {Schema, model, default: mongoose} = require('mongoose')


var commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        unique: true
    },
    attachedTo: {
        type: Schema.Types.ObjectId,
        ref: "blog"
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {timestamps: true})

var comment = model('comment', commentSchema)

module.exports = comment