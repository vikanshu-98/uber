const userModel = require('../models/user.model')

module.exports.createUser= async({firstname,lastname,password,email}) =>{
    if(!firstname || !email || !password){
        throw new Error('All fields required')
    }
try {
    const user = await userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    }) 
    console.log(user);
    
    return user

} catch (error) {
    console.log(error);
    
    throw new Error(error.message)
}
    
}