const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../services')
const { UserModel } = require('../models')
const { JWT_SECRET_KEY } = require('../config')

module.exports = {
    async isAuthenticate(req, res, next) {
        const { token } = req.cookies
        if (!token) return next(new ErrorHandler('Please login to access this resource', 401))

        try {
            const payload = await jwt.verify(token, JWT_SECRET_KEY)
            req.user = await UserModel.findById(payload.id)
            next()
        } catch (err) {
            return next(err)
        }

    },

    authorizeRoles(...roles) {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403))
            }

            next()
        }
    }
}