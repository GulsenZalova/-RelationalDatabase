const {ordersSchema}=require("../models/ordersSchema")


const ordersController={
    getAll: (req,res)=>{
        ordersSchema.find({isDeleted:false},(err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    getById:(req,res)=>{
        const id=req.params.id
        ordersSchema.findById(id,(err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    add:(req,res)=>{
        let newOrders=new ordersSchema({
            productName: req.body.productName,
            categoryID:req.body.categoryID,
            productPrice:req.body.productPrice,
            productDescription:req.body.productDescription,
            buyerID:req.body.buyerID,
            isDeleted:req.body.isDeleted,
        })
        newOrders.save((err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    delete:(req,res)=>{
        const id=req.params.id
        ordersSchema.findById(id,(err,docs)=>{
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
        ordersSchema.findByIdAndUpdate(id,{
            productName: req.body.productName,
            categoryID:req.body.categoryID,
            productPrice:req.body.productPrice,
            productDescription:req.body.productDescription,
            buyerID:req.body.buyerID,
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
    ordersController
}