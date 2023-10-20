const express=require("express");
const mongoose=require("mongoose");

const userShema=new mongoose.Schema({
   
     name:{
         type:String,
         required:true,
         unquie:true,
         trim:true
     },
    email:{
        type:String,
        required:true,
        unquie:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    } ,
    confirmpassword:{
        type:String,
        required:true,
        trim:true
    },
  

});
 
// we need to create collection 
const Register=new mongoose.model("Register",userShema);

 module.exports=Register;