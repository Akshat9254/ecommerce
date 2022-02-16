const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const { JWT_SECRET_KEY, JWT_EXPIRE } = require('../config')

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Please enter name of the user'], trim: true, maxlength: [30, 'Length of the name field cannot exceed 30 characters'] },
    email: { type: String, required: [true, 'Please enter email of the user'], trim: true, validate: [validator.isEmail, 'email is invalid'], unique: true },
    password: { type: String, required: [true, 'Please enter password of the user'], minlength: [8, 'Password should be atleast 8 charcters'], select: false },
    avatar: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },
    role: { type: String, default: 'user' },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date }
}, { timestamps: true })


// hashing password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }

    next()
})


// signing jwt token
userSchema.methods.getJwtToken = async function () {
    return await jwt.sign({ id: this._id }, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    })
}


// comparing password
userSchema.methods.comaprePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


// generating password reset token
userSchema.methods.getResetPasswordToken = function () {
    // generate token 
    const resetToken = crypto.randomBytes(20).toString('hex')

    // hashing and adding resetToken to userSchema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('User', userSchema)