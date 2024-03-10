const jwt = require('jsonwebtoken');
const secret = 'ravi'

const generateToken = function(user) {
    console.log('user', user)
    const payload = {
        name: user.fullName,
        email: user.email,
        role: user.role,
        profileImageURL: user.profileImageURL,
        _id: user._id
    }
    var token = jwt.sign(payload, secret)
    return token
}

const verifyToken = function(token) {
    return jwt.verify(token, secret)
}

module.exports = {
    generateToken,
    verifyToken
}