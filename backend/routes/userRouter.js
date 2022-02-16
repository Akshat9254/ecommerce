const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const { auth } = require('../middlewares')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.get('/refresh', userController.refresh)
router.post('/forgotPassword', userController.forgotPassword)
router.put('/password/reset/:token', userController.resetPassword)
router.get('/me', auth.isAuthenticate, userController.getUserDetails)
router.put('/password/update', auth.isAuthenticate, userController.updatePassword)
router.put('/me/update', auth.isAuthenticate, userController.updateProfile)
router.get('/admin/all', auth.isAuthenticate, auth.authorizeRoles('admin'), userController.getAllUsers)
router.get('/admin/:id', auth.isAuthenticate, auth.authorizeRoles('admin'), userController.getUser)
router.put('/admin/:id', auth.isAuthenticate, auth.authorizeRoles('admin'), userController.updateUserRole)
router.delete('/admin/:id', auth.isAuthenticate, auth.authorizeRoles('admin'), userController.deleteUser)



module.exports = router