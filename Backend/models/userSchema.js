const { default: mongoose } = require("mongoose");
const Schema=mongoose.Schema


const schema=new Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
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


const userSchema=mongoose.model("userSchema",schema)

module.exports={
    userSchema
}