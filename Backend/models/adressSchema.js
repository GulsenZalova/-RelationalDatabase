const { default: mongoose } = require("mongoose");
const Schema=mongoose.Schema



const schema= Schema({
    streetName: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    region: {
        type:String,
        required:true
    },
    postalCode:{
        type:Number,
        required:true
    },
    isDeleted:Boolean,
    date:{
        type:Date,
        default:Date.now()
    }
})


const addressSchema=mongoose.model("addressSchema",schema)

module.exports={
    addressSchema
}