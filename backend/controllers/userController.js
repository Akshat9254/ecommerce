const { UserModel } = require('../models')
const { ErrorHandler, sendToken, sendEmail } = require('../services')
const crypto = require('crypto')
const cloudinary = require('cloudinary')
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config')

module.exports = {
    // register a user
    async registerUser(req, res, next) {
        try {
            // console.log(req.body)
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'avatars',
                width: 150,
                crop: 'scale'
            })

            const user = await UserModel.create({
                ...req.body,
                avatar: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            })

            sendToken(user, 201, res, next)
        } catch (err) {
            return next(err)
        }
    },

    async loginUser(req, res, next) {
        const { email, password } = req.body

        // checking if email && password exists
        if (!email || !password) return next(new ErrorHandler('Please enter email and password to login', 400))

        try {
            const user = await UserModel.findOne({ email }).select('+password')
            if (!user) return next(new ErrorHandler('Invalid email or password', 400))

            const isPasswordMatched = await user.comaprePassword(password)
            if (!isPasswordMatched) return next(new ErrorHandler('Invalid email or password', 400))

            // sendToken(user, 200, res, next)
            const token = await user.getJwtToken()

            res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })

            res.status(200).json({ user })
        } catch (err) {
            return next(err)
        }
    },

    async refresh(req, res, next) {
        try {
            const { token } = req.cookies
            if (!token) return next(new ErrorHandler('Token not found'), 401)

            const { id } = jwt.verify(token, JWT_SECRET_KEY)
            if (!id) return next(new ErrorHandler('Invalid token'), 401)

            const user = await UserModel.findById(id)
            if (!user) return next(new ErrorHandler('User not found'), 401)

            res.status(200).json({ user })
        } catch (err) {
            return next(err)
        }
    },

    logoutUser(req, res) {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({
            message: 'user logged out'
        })
    },

    async forgotPassword(req, res, next) {
        try {
            const user = await UserModel.findOne({ email: req.body.email })
            if (!user) return next(new ErrorHandler('User not found', 404))

            const resetToken = user.getResetPasswordToken()

            await user.save({ validateBeforeSave: false })

            const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/user/password/reset/${resetToken}`

            const message = `Your password reset token is :- \n\n${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Ecommerce Password Recovery',
                    message
                })

                res.status(200).json({
                    message: `email sent to ${user.email}`
                })
            } catch (err) {
                user.resetPasswordToken = undefined
                user.resetPasswordExpire = undefined

                await user.save()

                return next(err)
            }
        } catch (err) {
            return next(err)
        }
    },

    async resetPassword(req, res, next) {
        // creating token hash
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
        try {
            const user = await UserModel.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })
            if (!user) return next(new ErrorHandler('Reset Password token is invalid or has been expired', 400))

            if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler('Passwords does not match', 400))

            user.password = req.body.password
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()

            sendToken(user, 200, res, next)
        } catch (err) {
            return next(err)
        }
    },

    async getUserDetails(req, res, next) {
        try {
            const user = await UserModel.findById(req.user.id)
            res.status(200).json({ user })
        } catch (err) {
            return next(err)
        }
    },

    async updatePassword(req, res, next) {
        try {
            const user = await UserModel.findById(req.user.id).select('+password')

            const isPasswordMatched = await user.comaprePassword(req.body.oldPassword)
            if (!isPasswordMatched) return next(new ErrorHandler('Old Password is incorrect', 400))

            if (req.body.newPassword !== req.body.confirmPassword) return next(new ErrorHandler('Passwords does not match', 400))

            user.password = req.body.newPassword
            await user.save()

            sendToken(user, 200, res, next)
        } catch (err) {
            return next(err)
        }
    },

    async updateProfile(req, res, next) {
        try {
            const user = await UserModel.findByIdAndUpdate(req.user.id, { ...req.body }, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })

            res.status(200).json({
                message: 'Profile updated'
            })
        } catch (err) {
            return next(err)
        }
    },

    // get all users --admin
    async getAllUsers(req, res, next) {
        try {
            const allUsers = await UserModel.find()
            res.status(200).json({ allUsers })
        } catch (err) {
            return next(err)
        }
    },

    // get single user --admin
    async getUser(req, res, next) {
        try {
            const user = await UserModel.findById(req.params.id)
            if (!user) return next(new ErrorHandler('User not found', 404))
            res.status(200).json({ user })
        } catch (err) {
            return next(err)
        }
    },

    // update user role --admin
    async updateUserRole(req, res, next) {
        try {
            await UserModel.findByIdAndUpdate(req.params.id, { ...req.body }, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })

            res.status(200).json({
                message: 'Profile updated'
            })
        } catch (err) {
            return next(err)
        }
    },

    // delete user --admin
    async deleteUser(req, res, next) {
        try {
            await UserModel.findByIdAndDelete(req.params.id)
            res.status(200).json({
                message: 'User deleted'
            })
        } catch (err) {
            return next(err)
        }
    }
}