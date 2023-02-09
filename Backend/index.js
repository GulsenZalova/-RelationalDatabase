const express = require('express');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const PORT = 8080;
const cors=require("cors")
const app = express();
const nodemailer = require('nodemailer')

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const adressRouter=require("./routers/adressRouter")
const buyerRouter=require("./routers/buyerRouter")
const categoryRouter=require("./routers/categoryRouter")
const ordersRouter=require("./routers/ordersRouter")
const userRouter=require("./routers/userRouter")


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
app.use("/auth/login",userRouter)




app.get('/', function (req, res) {
    res.json("Hello");
})

app.listen(8080);