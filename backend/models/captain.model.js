const mongoose = require('mongoose')
const jwt  = require('jsonwebtoken')
const bcrypt  = require('bcrypt')


const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'Firstname must bt at least 3 character long']
        },
        lastname:{
            type:String,
            required:true,
            minlength:[3,'Lastname must bt at least 3 character long']
        }
    },
    email:{
        required:true,
        type:String,
        unique:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,'Please enter a valid email']
    },
    password:{
        type:String,
        required:true,
        select:false

    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be atleast 3 character long']
        },
        plate:{
            type:String,required:true,minlength:[3,'plate must be atleast 3 character long']
        },
        capacity:{
            type:String,require:true,min:[1,'Capacity must be at least 1']
        },
        vehicleType:{
            type:String,
            require:true,
            enum:['car','auto','motorcycle']
        },
        location:{
            lat:{
                type:Number,

            },
            lng:{
                type:Number
            }
        }
    }
},{timestamps:true})


captainSchema.methods.generateAuthToken =  function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}

captainSchema.methods.comparePassword = async function(password){
   return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword = async function(password){
   return await bcrypt.hash(password,10)
}

const captainModel = mongoose.model('captain',captainSchema)

module.exports=captainModel