const express=require("express")
const {ordersController}=require("../controllers/ordersController")
const route=express.Router()

route.get("/",ordersController.getAll)
route.get("/:id",ordersController.getById)
route.post("/",ordersController.add)
route.delete("/:id",ordersController.delete)
route.put("/:id",ordersController.update)

module.exports=route