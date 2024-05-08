const mongoose=require('mongoose')

let locationsSchema=mongoose.Schema({
    location:{
        type:String,
        required:true,
        trim:true
    },
    detail:{
        type:String,
        required:true,
        trim:true
    },
    userId:{
        type:mongoose.Types.ObjectId
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
})

let Locations=mongoose.model('Locations',locationsSchema);
module.exports=Locations