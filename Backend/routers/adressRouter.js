
const {adressController}=require("../controllers/adressController")
const express=require("express")
const route=express.Router()


route.get("/",adressController.getAll)
route.get("/:id",adressController.getById)
route.post("/",adressController.add)
route.delete("/:id",adressController.delete)
route.put("/:id",adressController.update)

module.exports=route