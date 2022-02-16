require('dotenv').config()

module.exports = {
    APP_PORT,
    DB_URL,
    JWT_SECRET_KEY,
    JWT_EXPIRE,
    COOKIE_EXPIRE,
    SMTP_SERVICE,
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_HOST,
    SMTP_PORT,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env