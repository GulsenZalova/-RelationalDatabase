const {userSchema}=require("../models/userSchema")
const jwt = require('jsonwebtoken');


const userController={
    getAll:(req,res)=>{
        userSchema.find({isDeleted:false},(err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    add:(req,res)=>{
        let newUser = new userSchema({
            userName: req.body.userName,
            password: req.body.password,
            isDeleted: false,
            date: req.body.date,
        })
        newUser.save((err,docs)=>{
            if(!err){
                let privateKey="loginuser"
                let token=jwt.sign({userName:newUser.userName},privateKey,{
                    algorithm: 'HS256',
                    expiresIn: '5h'  
                })
                res.json({"token":token})
            }else{
                res.status(500).json(err)
            }
        })
    }
}

module.exports={
    userController
}