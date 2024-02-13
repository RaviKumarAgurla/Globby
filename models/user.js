var {Schema, model} = require('mongoose')
var {createHmac, randomBytes} = require('crypto')
var path = require('path')
const { error } = require('console')

var userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    profileImageURL: {
        type: String,
        default: path.resolve('../public/images/default.png')
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER']
    }
}, {timestamps: true})

userSchema.pre("save", function (next){
    const user = this

    if(!user.isModified('password')) return
    var salt = randomBytes(16).toString()
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    user.salt = salt
    user.password = hashedPassword
    next()
})

userSchema.static('matchPassword', async function (email, userProvidedPassword) {
    const user = await this.findOne({email})
    if(!user) throw new Error('User not found')
    const salt = user.salt
    const passwordDB = user.password
    const hashedPassword = createHmac('sha256', salt).update(userProvidedPassword).digest('hex');
    
    if(passwordDB !== hashedPassword) throw new Error('User not found')

    return user
})



var user = model('user', userSchema)

module.exports = user