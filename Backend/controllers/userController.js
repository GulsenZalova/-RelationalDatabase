const {userSchema}=require("../models/userSchema")
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const mail = nodemailer.createTransport({
    direct: true,
    host: 'smtp.yandex.com',
    auth: {
        user: 'cagatay.yildiz@neominal.com',
        pass: 'xpioqsemuckxloiv'
    },
    secure: true
})

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
                res.json({token:token})
            }else{
                res.status(500).json(err)
            }
        })
    },
    sendMail:(req,res)=>{
        const messagge=req.query.messagge
        const mailAddress=req.query.mailAddress
        // console.log(messagge,mailAddress)
        const mailOptions = {
            from: 'cagatay.yildiz@neominal.com',
            to: mailAddress,
            subject: 'Test Mail',
            text: 'Hello World',
            html:`<html>${messagge}</html>`
        }
        
        mail.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }else{
                console.log(info)
                res.json("success")
            }
        })
    }
}

module.exports={
    userController
}