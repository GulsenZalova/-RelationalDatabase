const { default: mongoose } = require("mongoose");
const Schema=mongoose.Schema


const schema=new Schema({
    productName:{
        type:String,
        required:true
    },
    categoryID:{
        type:"ObjectId",
        ref:"categorySchema"
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    buyerID:{
        type:"ObjectId",
        ref:"buyerSchema"
    },
    isDeleted:Boolean,
    date:{
        type:Date,
        default:Date()
    }
})


const ordersSchema=mongoose.model("orderSchema",schema)

module.exports={
    ordersSchema
}