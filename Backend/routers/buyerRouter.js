const express=require("express")
const {buyerController}=require("../controllers/buyerController")
const route=express.Router()

route.get("/",buyerController.getAll)
route.get("/:id",buyerController.getById)
route.post("/",buyerController.add)
route.delete("/:id",buyerController.delete)
route.put("/:id",buyerController.update)


    
module.exports=route