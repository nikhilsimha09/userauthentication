const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const { authentication } = require('../middleware/authentication')


router.get('/',(req, res) =>{
    User.find()
        .then((users) => res.send(users))
        .catch((err) => res.send(err))
})

router.post('/register', (req, res) =>{
    const body = req.body
    const user = new User(body)
    user.save() 
        .then((user) => res.send({ user,
                                    notice: 'User Successfully Registered'
                                }))
        .catch((err) => res.send(err))                        
})

router.post('/login', (req, res) =>{
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then((user) => {
            user.generateToken()
            return {user,
                    notice: 'Logged in succesfully'}//user.generateToken()
        }).then((token) => res.send(token))
        .catch((err) => res.send(err)) // for gen tokens
        .catch((err) => res.send(err)) // for find by credentials
})

router.delete('/logout', authentication,(req, res) =>{   // check if the user is logged in before allowing logout 
    User.findOne({
        _id: req.user._id
    }).then((user) => {
        user.tokens = user.tokens.filter( token => token.token != req.header('x-auth'))
        user.save()
            .then((user) => {
                res.send({
                    user,
                    notice: 'Successfully Logged Out'
                }).catch((err) => res.send(err))
            })
    }).catch((err) => res.send(err))
})


module.exports = { usersRouter :router}