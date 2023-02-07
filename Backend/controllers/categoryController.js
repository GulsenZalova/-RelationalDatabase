const {categorySchema}=require("../models/categorySchema")


const categoryController={
    getAll: (req,res)=>{
        const query=req.query
        const limit=query.limit
        const sorting=query.sort
        let sort
         if(sorting=="decs"){
             sort=-1
        }else if(sorting=="asc"){
             sort=1
        }
        categorySchema.find({isDeleted:false}).limit(limit).sort({categoryName:sort}).exec((err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    getById:(req,res)=>{
        const id=req.params.id
        categorySchema.findById(id,(err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    add:(req,res)=>{
        let newCategory=new categorySchema({
            categoryName: req.body.categoryName,
            categoryDescription:req.body.categoryDescription,
            isDeleted:req.body.isDeleted,
        })
        newCategory.save((err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(docs)
            }
        })
    },
    delete:(req,res)=>{
        const id=req.params.id
        categorySchema.findById(id,(err,docs)=>{
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
        categorySchema.findByIdAndUpdate(id,{
            categoryName: req.body.categoryName,
            categoryDescription:req.body.categoryDescription,
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
    categoryController
}