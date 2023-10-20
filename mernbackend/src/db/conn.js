const express=require("express");
const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/registration",{
    useNewurlparser:true,
    useUnifiedTopology:true

}).then(()=>{
     console.log("connection is suceesful");
}).catch((e)=>{
     console.log(`no connection `);
})