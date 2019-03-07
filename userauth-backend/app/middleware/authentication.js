const { User } = require('../models/user')

function authentication(req, res, next){
    const token = req.header('x-auth')
    if(token){
        User.findByToken(token)
            .then((user) => {
                req.user = user
                next()
            })
            .catch((err) => {
                res.send(err)
            })
    } else {
        res.send('Token not provided')
    }
}

module.exports = { authentication }