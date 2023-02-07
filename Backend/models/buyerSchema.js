const { default: mongoose } = require("mongoose");
const Schema=mongoose.Schema


const schema = new Schema({
    buyerName: {
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    buyerAddress:{
        type:"ObjectId",
        ref: "addressSchema"
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date()
    }

})


const buyerSchema=mongoose.model("buyerSchema",schema)


module.exports={
    buyerSchema
}