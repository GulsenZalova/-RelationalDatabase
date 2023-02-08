const {addressSchema}=require("../models/adressSchema")

const adressController={
    getAll:(req,res)=>{
       const query=req.query
       const limit=query.limit
       const sorting=query.sort
       let startDate=query.startDate
       let endDate=query.endDate
       let sort
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
        if(sorting=="decs"){
            sort=-1
       }else if(sorting=="asc"){
            sort=1
       }
        addressSchema.find({isDeleted:false,date:{
            $gte:startDate,
            $lte:endDate
        }}).limit(limit).sort({streetName:sort}).exec((err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    getById:(req,res)=>{
        const id=req.params.id
        addressSchema.findById(id,(err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    add:(req,res)=>{
        let newAdress=new addressSchema({
            streetName: req.body.streetName,
            city:req.body.city,
            region:req.body.region,
            postalCode:req.body.postalCode,
            isDeleted:false,
        })

        newAdress.save((err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    delete:(req,res)=>{
        const id=req.params.id
        addressSchema.findById(id,(err,docs)=>{
            if(!err){
                docs.isDeleted=true
                res.json(docs)
                docs.save()
            }else{
                res.status(500).json(docs)
            }
        })
    },
    update:(req,res)=>{
        const id=req.params.id
        addressSchema.findByIdAndUpdate(id,{
            streetName: req.body.streetName,
            city:req.body.city,
            region:req.body.region,
            postalCode:req.body.postalCode,
            isDeleted:req.body.isDeleted,
            runValidators:true
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


// let newAdress=new addressSchema({
//     streetName: "sfvf",
//     city:"sdvdsf",
//     region: "sdvds",
//     postalCode:3343
// })

// newAdress.save()

module.exports={
    adressController
}