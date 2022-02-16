const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Please enter name of the product'], trim: true },
    description: { type: String, required: [true, 'Please enter description of the product'], trim: true },
    price: { type: Number, required: [true, 'Please enter price of the product'], maxlength: [8, 'Price cannot exceed 8 figures'] },
    rating: { type: Number, default: 0 },
    images: [{
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    }],
    category: { type: String, required: [true, 'Please enter category of the product'] },
    stock: { type: Number, maxlength: [4, 'Stock of the product cannot exceed 9999'], default: 1 },
    numberOfReviews: { type: Number, default: 0 },
    reviews: [{
        user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        date: { type: Date, required: true }
    }],
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)