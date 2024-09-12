const express = require('express');
const cors = require('cors');
const app = express();
require('./config/db')
const userRouter = require('./routes/userRoute')

app.use(cors());
app.use(express.urlencoded ({extended:true}));
app.use(express.json());
app.use('/api/users',userRouter)

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/views/index.html')
})

// if route not found

app.use((req,res,next)=>{
    res.status(404).json({
        message:'route not found'
    })
})

// if have any server err 

app.use((err,req,res,next)=>{
    res.status(500).json({
        message:'somthing brock'
    })
})

module.exports = app;