const express = require('express')
const router  = express.Router()
const {body} = require('express-validator')
const captainController = require('../controllers/captain.controller')
const authMiddleware =  require('../middlewares/auth.middleware')
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be alteast 3 character'),
    body('password').isLength({min:6}).withMessage('Password must be alteast 6 character'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be alteast 3 character'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be atleast 3 character'),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('invalid vehicle')
],
captainController.registerCaptain
)
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'), 
    body('password').isLength({min:6}).withMessage('Password must be alteast 6 character'),  
],
captainController.loginCaptain
)


router.get('/profile',authMiddleware.authCaptain,captainController.captainProfile)
router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)

module.exports= router
