require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// internal imports
const notFoundMiddleware = require("./middleware/error-handler");
const errorMiddleware = require("./middleware/not-found");
const productsRouter = require("./routes/products");


// routes 
app.use("/helo" , (req , res)=>{
    console.log(`helo url`);
})

app.use("/api/v1/products" , productsRouter);



// database connection
mongoose.connect("mongodb+srv://shovon:storeAPI@store-cluster.o7kflav.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser:true , 
    useCreateIndex:true , 
    useFindAndModify:false , 
    useUnifiedTopology:true
})
.then(()=>{
    console.log(`atlas connnected`)})
.catch(()=>{
    console.log(`Not connected!`)})

 // error handler
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async ()=>{
    try{
        // connectDB
        app.listen(port , ()=>{
            console.log(`Server is listening port ${port}...`);
        })
    }
    catch(err){
        console.log(err);
    }
}

start();