const captainModel = require('../models/captain.model')

const {validationResult} = require('express-validator')
const { createCaptain } = require('../services/captain.service')
const blacklistTokenModel = require('../models/blacklistToken.model')
module.exports.registerCaptain= async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }

    const {fullname,password,email,vehice} = req.body
    const isCaptainEmailPresent  =  await captainModel.findOne({email})
    if(isCaptainEmailPresent){
        return res.status(400).json({message:'captain already exist'})
    }

    const hash = await captainModel.hashPassword(password)
    const captain = await createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        password:hash,
        email,
        color:vehice.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehice.vehicleType
    })
    const token   = captain.generateAuthToken()
    return res.status(201).json({token,captain})

}


module.exports.loginCaptain= async (req,res,next)=>{
    const error =  validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const {email,password}   =  req.body
    const captain = await captainModel.findOne({email}).select('*password')
    if(!captain){
        return res.status(401).json({message:'Invalid email or password'})
    }

    const isMatch = await captain.comparePassword(password)
    if(!isMatch) return res.status(401).json({message:'Invalid email or password'})
    const token =  captain.generateAuthToken()
    res.cookie('token',token)
    res.send(200).json({token,captain})

}

module.exports.captainProfile= async(req,res,next)=>{
    return res.json(200).status({captain:req.captain})
}


module.exports.logoutCaptain= async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    await blacklistTokenModel.create({token})

    res.clearCooke('token')
    res.status(200).json({message:'Logout successfully'})
}


