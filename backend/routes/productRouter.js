const express = require('express')
const router = express.Router()
const { productController } = require('../controllers')
const { auth } = require('../middlewares')

router.post('/admin/create', auth.isAuthenticate, auth.authorizeRoles('admin'), productController.createProduct)
router.get('/admin/all', auth.isAuthenticate, auth.authorizeRoles('admin'), productController.allProducts)
router.get('/all', productController.getAllProducts)
router.put('/admin/:id', auth.isAuthenticate, auth.authorizeRoles('admin'), productController.updateProduct)
router.delete('/admin/:id', auth.isAuthenticate, auth.authorizeRoles('admin'), productController.deleteProduct)
router.get('/:id', productController.getProductDetails)
router.put('/review', auth.isAuthenticate, productController.createProductReview)
router.get('/review/:id', productController.getProductReviews)
router.delete('/review/:productId/:id', auth.isAuthenticate, productController.deleteProductReview)


module.exports = router