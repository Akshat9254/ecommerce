const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')

const cookieParser = require('cookie-parser')

const { APP_PORT, connectDatabase, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('./config')
const { productRouter, userRouter, orderRouter } = require('./routes')
const { error } = require('./middlewares')


process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to Uncaught Exception')
    server.close(() => {
        process.exit(1)
    })
})



cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

app.use(fileUpload())
connectDatabase()



app.use('/api/product', productRouter)
app.use('/api/user', userRouter)
app.use('/api/order', orderRouter)


// middleware for error
app.use(error)

const server = app.listen(APP_PORT, () => {
    console.log(`server listening at ${APP_PORT}`)
})


// unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to Unhandled Promise Rejection')
    server.close(() => {
        process.exit(1)
    })
})