
const {userController}=require("../controllers/userController")
const express=require("express")
const route=express.Router()

route.get("/",userController.getAll)
route.post("/",userController.add)


module.exports=route