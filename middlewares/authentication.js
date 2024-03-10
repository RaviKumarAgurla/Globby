const { verifyToken } = require('../Services/authentication')

function checkForAuthenticationCookie(name){
    return (req, res, next) => {
        var token = req.cookies[name]
        if(!token) {
            return next()
        }
        try{
            var userPayload = verifyToken(token)
            console.log('payload ' + JSON.stringify(userPayload))
            req.user = userPayload
        }catch(err){}
        return next()
    }
}

module.exports = {
    checkForAuthenticationCookie
}