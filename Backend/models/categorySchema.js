const { default: mongoose } = require("mongoose");
const Schema=mongoose.Schema

const schema=new Schema({
    categoryName:{
        type:String,
        required:true
    },
    categoryDescription:{
        type:String,
        required:true
    },
    isDeleted:Boolean,
    date:{
        type:Date,
        default:Date()
    }
})


const categorySchema=mongoose.model("categorySchema",schema)

module.exports={
    categorySchema
}