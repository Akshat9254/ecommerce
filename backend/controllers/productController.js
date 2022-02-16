const { ProductModel } = require('../models')
const { ErrorHandler, ApiFeatures } = require('../services')
const cloudinary = require('cloudinary')

module.exports = {
    // create a product -- admin
    async createProduct(req, res, next) {
        req.body.user = req.user.id
        let imagesLink = []
        try {
            for (let i = 0; i < req.body.images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(req.body.images[i], {
                    folder: 'products'
                })

                imagesLink.push({ public_id: result.public_id, url: result.secure_url })
            }

            req.body.images = imagesLink
        } catch (err) {
            return next(err)
        }

        try {
            const product = await ProductModel.create(req.body)
            res.status(201).json({
                message: 'product created',
                product
            })
        } catch (err) {
            return next(err)
        }

    },

    // get all products
    async getAllProducts(req, res, next) {
        const resultPerPage = 10

        const apiFeature = new ApiFeatures(ProductModel.find(), req.query).search().filter().pagination(resultPerPage)
        try {
            const allProducts = await apiFeature.query
            const productCount = await ProductModel.countDocuments()
            res.status(200).json({
                message: 'All Products',
                allProducts,
                productCount
            })
        } catch (err) {
            return next(err)
        }
    },

    // update a product --admin
    async updateProduct(req, res, next) {
        let product
        try {
            product = await ProductModel.findById(req.params.id)
            if (!product) {
                return next(new ErrorHandler('Product not found', 404))
            }
        } catch (err) {
            return next(err)
        }

        try {
            product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: true
            })
        } catch (err) {
            return next(err)
        }

        res.status(200).json({
            message: 'Product updated.',
            product
        })
    },

    // delete product --admin
    async deleteProduct(req, res, next) {
        try {
            const product = await ProductModel.findByIdAndDelete(req.params.id)
            if (!product) {
                return next(new ErrorHandler('Product not found', 404))
            }

            res.status(200).json({
                message: 'Product deleted',
                product
            })
        } catch (err) {
            return next(err)
        }

    },

    async getProductDetails(req, res, next) {
        try {
            const product = await ProductModel.findById(req.params.id)
            if (!product) {
                return next(new ErrorHandler('Product not found', 404))
            }

            res.status(200).json({
                message: 'Product found',
                product
            })
        } catch (err) {
            return next(err)
        }
    },

    // create and update review
    async createProductReview(req, res, next) {
        const { rating, comment, productId } = req.body

        const review = {
            user: req.user.id,
            name: req.user.name,
            rating: Number(rating),
            comment,
            date: Date.now()
        }

        try {
            const product = await ProductModel.findById(productId)
            const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user.id)

            if (isReviewed) {
                product.reviews.forEach(rev => {
                    if (rev.user.toString() === req.user.id) {
                        rev.rating = rating
                        rev.comment = comment
                    }
                })
            } else {
                product.reviews.push(review)
            }

            product.numberOfReviews = product.reviews.length

            let avg = 0
            product.reviews.forEach((rev) => avg += rev.rating)
            product.rating = avg / product.reviews.length

            await product.save({ validateBeforeSave: false })
            res.status(200).json({
                message: 'Review added'
            })

        } catch (err) {
            return next(err)
        }
    },

    // get all reviews of a product
    async getProductReviews(req, res, next) {
        // console.log("id", req.query.id)
        try {
            const product = await ProductModel.findById(req.params.id)
            if (!product) return next(new ErrorHandler('Product not found', 404))

            res.status(200).json({
                reviews: product.reviews
            })
        } catch (err) {
            return next(err)
        }
    },

    async deleteProductReview(req, res, next) {
        try {
            // console.log('deleteProductReviews')
            // console.log({ ...req.params })
            const product = await ProductModel.findById(req.params.productId)
            if (!product) return next(new ErrorHandler('Product not found', 404))

            const reviews = product.reviews.filter(rev => rev._id.toString() !== req.params.id)
            const numberOfReviews = reviews.length
            let avg = 0
            reviews.forEach((rev) => avg += rev.rating)
            const rating = reviews.length === 0 ? 0 : avg / reviews.length


            await ProductModel.findByIdAndUpdate(req.params.productId, {
                reviews, numberOfReviews, rating
            }, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })


            res.status(200).json({
                message: 'Review deleted'
            })
        } catch (err) {
            return next(err)
        }
    },

    // get all products --admin
    async allProducts(req, res, next) {
        try {
            const products = await ProductModel.find()
            res.status(200).json({ products })
        } catch (err) {
            return next(err)
        }
    }
}