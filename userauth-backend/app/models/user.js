const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) =>{
                return validator.isEmail(email)
            },
            message: () =>{
                return('Invalid Email Format')
            }
        }
    },
    password:{
        type: String,
        required: true,
        maxlength: 128,
        minlength: 8
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
})


userSchema.pre('save', function(next){              // pre save does not accept es6
    if(this.isNew){
        bcryptjs.genSalt(10).then((salt) => {
            bcryptjs.hash(this.password, salt)
                .then((hashedPassword) => {this.password = hashedPassword
                                            next()
                })
        })   
    } else {
        next()
    }
})

userSchema.statics.findByCredentials = function(email, password){ // used to finf the users cred when they requests for login
    const User = this
    return User.findOne({ email }).then((user) => {
        if(user){
            return bcryptjs.compare(password, user.password).then((result) => {
                if(result){
                    return Promise.resolve(user)
                } else {
                    return Promise.reject('Invaid Credentials')
                }
            })
        } else {
            return Promise.reject('Invalid Credentials')
        }
    }).catch((err) => {return Promise.reject(err)})
}

userSchema.methods.generateToken = function(){   // a new token is generated when user logs in
    const user = this
    const userData = {
        userId: user._id,
        username: user.username,
        password: user.password
    }
    const token = jwt.sign(userData, 'authtokenmasterkey')
    user.tokens.push({ token })
    return user.save().then((user) =>{
        return token
    }).catch((err) => {return err })
}

userSchema.statics.findByToken = function(token){       // used in authentication of user
    let tokenData
    try{
        tokenData = jwt.verify(token, 'authtokenmasterkey')
    } catch(err) {
        return Promise.reject(err)
    }
    return User.findOne({
        _id: tokenData.userId,
        'tokens.token': token
    }).then((user) => Promise.resolve(user))
        .catch((err) => Promise.reject(err))
}

const User = mongoose.model('User', userSchema)

module.exports = { User }