const e = require("express")
const { json } = require("express")
const {buyerSchema}=require("../models/buyerSchema")

const buyerController={
    getAll: (req,res)=>{
        buyerSchema.find({isDeleted:false},(err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    getById:(req,res)=>{
        const id=req.params.id
        buyerSchema.findById(id,(err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    add:(req,res)=>{
        let newBuyer=new buyerSchema({
            buyerName: req.body.buyerName,
            phoneNumber:req.body.phoneNumber,
            buyerAddress:req.body.buyerAddress,
            isDeleted:req.body.isDeleted,
        })
        newBuyer.save((err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    delete:(req,res)=>{
        const id=req.params.id
        buyerSchema.findById(id,(err,docs)=>{
            if(!err){
                docs.isDeleted=true
                docs.save()
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    update:(req,res)=>{
        const id=req.params.id
        buyerSchema.findByIdAndUpdate(id,{
            buyerName: req.body.buyerName,
            phoneNumber:req.body.phoneNumber,
            buyerAddress:req.body.buyerAddress,
            isDeleted:req.body.isDeleted, 
        },(err,docs)=>{
            if(!err){
                res.json(docs)
                docs.save()
            }else{
                res.status(500).json(docs)
            } 
        })
    }
}

module.exports={
    buyerController
}