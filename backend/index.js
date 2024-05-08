const express=require('express');
const app=express();
const userRoutes=require("./routes/userRoutes");
const mongoose = require('mongoose');
const cors = require('cors');
const zomatoRoutes = require('./routes/zomatoRoutes');
const reviewRoutes = require('./routes/reviewRoutes')
mongoose.connect('mongodb://localhost:27017/zomato')
                  
.then(()=>{
    console.log("DB connected");
})
.catch(()=>{
    console.log("error",err);
});
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(zomatoRoutes);
app.use(reviewRoutes)
const PORT=8080;
app.listen(PORT,function(){
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
});