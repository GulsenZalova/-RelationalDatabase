const {addressSchema}=require("../models/adressSchema")

const adressController={
    getAll:(req,res)=>{
        addressSchema.find({isDeleted:false},(err,docs)=>{
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