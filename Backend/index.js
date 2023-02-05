const express = require('express');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 8080;
const cors=require("cors")
const app = express();
// let privateKey="RelationalDatabase"
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const adressRouter=require("./routers/adressRouter")
const buyerRouter=require("./routers/buyerRouter")
const categoryRouter=require("./routers/categoryRouter")
const ordersRouter=require("./routers/ordersRouter")
mongoose.connect("mongodb+srv://gulshen:program2022@cluster0.fg9rwde.mongodb.net/RelationalDatabase")
    .then(res => {
        console.log('Connect!');
    })
    .catch(err => {
        console.log('err', err);
    })
app.use("/api/adresses",adressRouter)
app.use("/api/buyer",buyerRouter)
app.use("/api/category",categoryRouter)
app.use("/api/orders",ordersRouter)
// app.post("/token",(req,res)=>{
//     if(req.body.email=="token.com" && req.body.password=="12345"){
//       let token = jwt.sign({email:"token.com"},privateKey,{
//           algorithm:"HS256",
//           expiresIn:"5h"
//         });
//         res.send(token)
//     }else{
//         res.status(401).send("Problem")
//     }
// })


// app.get("/api/suppliers",function(req,res){
//    let token=req.headers.authorization
//    console.log(token)
//    jwt.verify(token,privateKey,function(err,decode){
//     if(err){
//         res.status(401).send(err)
//     }else{
//         console.log(decode)
//         res.send("OK")
//     }
//    })
// })

app.get('/', function (req, res) {
    res.json("Hello");
})

app.listen(PORT);