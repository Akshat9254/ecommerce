const express = require('express')
const router = express.Router()
const { orderController } = require('../controllers')
const { auth } = require('../middlewares')

router.post('/new', auth.isAuthenticate, orderController.newOrder)
router.get('/me', auth.isAuthenticate, orderController.getMyOrders)
router.get('/:id', auth.isAuthenticate, orderController.getSingleOrder)
router.get('/admin/all', auth.isAuthenticate, auth.authorizeRoles('admin'), orderController.getAllOrders)
router.put('/admin/status/:id', auth.isAuthenticate, auth.authorizeRoles('admin'), orderController.updateOrderStatus)
router.delete('/admin/:id', auth.isAuthenticate, auth.authorizeRoles('admin'), orderController.deleteOrder)




module.exports = router