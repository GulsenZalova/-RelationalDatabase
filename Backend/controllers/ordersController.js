const {ordersSchema}=require("../models/ordersSchema")


const ordersController={
    getAll: (req,res)=>{
        const query=req.query
        const limit=query.limit
        const sorting=query.sort
        let startDate=query.startDate
        let endDate=query.endDate
        let sort
        // date conditions
        if(!startDate){
            startDate=new Date(0)
        }else{
            startDate=new Date(startDate)
        }
        if(!endDate){
            endDate=new Date()
        }else{
            endDate=new Date(endDate)
        }
        console.log(startDate)
        // sort conditions
         if(sorting=="decs"){
             sort=-1
        }else if(sorting=="asc"){
             sort=1
        }
        ordersSchema.find({isDeleted:false,date:{
            $gte:startDate,
            $lte:endDate
        }}).limit(limit).sort({productName:sort}).populate("categoryID").populate({path:"buyerID",populate:{path:"buyerAddress"}})
        .exec((err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    getById:(req,res)=>{
        const id=req.params.id
        ordersSchema.findById(id).populate("categoryID").populate({path:"buyerID",populate:{path:"buyerAddress"}}).exec((err,docs)=>{
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