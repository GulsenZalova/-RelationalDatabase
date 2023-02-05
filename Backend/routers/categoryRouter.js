const express=require("express")
const {categoryController}=require("../controllers/categoryController")
const route=express.Router()

route.get("/",categoryController.getAll)
route.get("/:id",categoryController.getById)
route.post("/",categoryController.add)
route.delete("/:id",categoryController.delete)
route.put("/:id",categoryController.update)



module.exports=route