const { COOKIE_EXPIRE } = require('../config')

module.exports = async (user, statusCode, res, next) => {
    try {
        const token = await user.getJwtToken()

        res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        res.cookie('cookie', 'value')

        res.status(statusCode).json({ user })
    } catch (err) {
        return next(err)
    }
}