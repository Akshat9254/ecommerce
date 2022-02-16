const { OrderModel, ProductModel } = require('../models')
const { ErrorHandler } = require('../services')

module.exports = {
    async newOrder(req, res, next) {
        try {
            const order = await OrderModel.create({
                ...req.body,
                paidAt: Date.now(),
                user: req.user._id
            })

            res.status(201).json({
                message: 'Order Placed',
                order
            })
        } catch (err) {
            return next(err)
        }
    },

    async getSingleOrder(req, res, next) {
        try {
            const order = await OrderModel.findById(req.params.id).populate('user', 'name email')
            if (!order) return next(new ErrorHandler('Order not found', 404))
            res.status(200).json({ order })
        } catch (err) {
            return next(err)
        }
    },


    // get all orders of a logged in user
    async getMyOrders(req, res, next) {
        try {
            const allOrders = await OrderModel.find({ user: req.user._id })
            if (!allOrders) return next(new ErrorHandler('Order not found', 404))

            res.status(200).json({ allOrders })
        } catch (err) {
            return next(err)
        }
    },

    // get all orders --admin
    async getAllOrders(req, res, next) {
        try {
            const allOrders = await OrderModel.find()
            let totalAmount = 0
            allOrders.forEach(order => totalAmount += order.totalPrice)
            res.status(200).json({ allOrders, totalAmount })
        } catch (err) {
            return next(err)
        }
    },

    // update order status --admin
    async updateOrderStatus(req, res, next) {
        const updateStock = async (productId, quantity) => {
            try {
                const product = await ProductModel.findById(productId)
                product.stock -= quantity

                await product.save({ validateBeforeSave: false })
            } catch (err) {
                console.log(err)
            }
        }
        try {
            const order = await OrderModel.findById(req.params.id)
            if (!order) return next(new ErrorHandler('Order not found', 404))

            if (order.orderStatus === 'Delievered') return next(new ErrorHandler('Order already delivered', 400))

            order.orderItems.forEach(async (item) => {
                await updateStock(item.product, item.quantity)
            })

            order.orderStatus = req.body.status

            if (req.body.status === 'Delivered') order.deleiveredAt = Date.now()

            await order.save({ validateBeforSave: false })

            res.status(200).json({ message: `Order status updated to ${req.body.status}` })

        } catch (err) {
            return next(err)
        }
    },

    // delete order --admin
    async deleteOrder(req, res, next) {
        try {
            await OrderModel.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: 'Order deleted' })
        } catch (err) {
            return next(err)
        }
    }
}
