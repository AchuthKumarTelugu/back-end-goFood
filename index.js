const express = require('express')
const app = express()
const cors=require('cors')
app.use(cors())
const cookieParser=require('cookie-parser')
app.use(cookieParser())
const mongooseConnect = require('./db.js')
const mongooseConnection = async () =>{
    await mongooseConnect()
    console.log('database connection is ensured')
}
mongooseConnection()
app.get('/', (req, res) => {
    res.send('hello world')
})
app.use(express.json())
app.use('/api/', require('./Routes/CreateUser.js'))
app.use('/api/',require('./Routes/DisplayData.js'))
app.use('/api/',require('./Routes/OrderData.js'))
app.listen(5000, (req, res) => {
    console.log('server is running on port 5000')
})
