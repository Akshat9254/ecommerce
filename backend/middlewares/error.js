const error = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'

    // wrong mongodb id error
    if (err.name === 'CastError') {
        console.log(err)
        err.statusCode = 400
        err.message = `Resource not found. Invalid: ${err.path}`
    }

    // mongodb duplicate key err
    if (err.code === 11000) {
        err.message = `Duplicate ${Object.keys(err.keyValue)} entered`
    }

    // wrong jwt error
    if (err.name === 'JsonWebTokenError') {
        err.statusCode = 400
        err.message = 'JSON Web Token is invalid'
    }

    // jwt expire error
    if (err.name === 'TokenExpiredError') {
        err.statusCode = 400
        err.message = 'JSON Web Token is Expired, Try again'
    }

    res.status(err.statusCode).json({
        message: err.message
    })
}

module.exports = error