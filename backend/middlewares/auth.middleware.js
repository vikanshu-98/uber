const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const blackListTokenModel  = require('../models/blacklistToken.model')
const captainModel = require('../models/captain.model')

module.exports.authUser = async (req,res,next)=>{
    const token  = req.cookies.token || req.headers.authorizatio?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:'unauthorized'})
    }


    const isBlackListed =  await blackListTokenModel.findOne({token})
    if(isBlackListed){
        return res.status(401).json({message:'unauthorized'})
    }
    try{
        const {_id} = jwt.verify(token,process.env.JWT_SECRET)
        const user  = await userModel.findById({_id})
        req.user = user
        return next()
    }catch(err){
        return res.status(401).json({message:'unauthorized'})
    }
    
}


module.exports.authCaptain = async (req,res,next) =>{
    const token  = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }
    const isBlackListed =  await blackListTokenModel.findOne({token})
    if(isBlackListed)
        return res.status(401).json({message:'Unauthorized'})

    try {
        const {_id} = jwt.verify(token,process.env.JWT_SECRET)
        const captain   = await captainModel.findById(_id)
        res.captain = captain
        return next()
    } catch (error) {
        return res.status(401).json({message:'unauthorized'})
    }
}