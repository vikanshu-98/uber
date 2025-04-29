const express =require('express')
const dotenv =  require('dotenv')
const cors =  require('cors')
const cookieParser =  require('cookie-parser')
dotenv.config()
const app = express()
const connectToDb= require('./db/db')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
connectToDb()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use('/users',userRoutes)

app.use('/captains',captainRoutes)



module.exports=app