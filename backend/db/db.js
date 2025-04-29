const mongoose =  require('mongoose')
function connectToDb(){
    mongoose.connect(process.env.DB_URL).then(()=>console.log('connect to db')).catch((err)=> console.log(err)
    )
}


module.exports= connectToDb