
const express=require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();
require("./db/conn");
const Register=require("./model/register");
const { log } = require("console");
const port=process.env.PORT|| 4000;
const staticpath=path.join(__dirname,"../public");
    const templates_path=path.join(__dirname,"../templates/views");
    const partials_path=path.join(__dirname,"../templates/partials");
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));

     app.set("view engine","hbs");
     app.set("views",templates_path);
     hbs.registerPartials(partials_path);
   app.use(express.static(staticpath));
                                 




app.get("/",(req,res)=>{
    res.render("index");
})

 app.get("/login",(req,res)=>{
     res.render("login");
 })

 app.get("/register",(req,res)=>{
     res.render("register");
 })

 // create new user in our database
 app.post("/register",async(req,res)=>{
     try
     {
       
        const password=req.body.password;
        const confirmpassword=req.body.confirmpassword;
        if(password===confirmpassword)
        {
            const userRegister=new Register({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })

             const result=await userRegister.save();
            //  res.send(result);
            res.render("index");
        }
        else
        {
            res.send("password is invalide");
        }


     } 
     catch(e)
     {
        res.send(e);
     }
    
})

// login chek videos no:73
// note when we r using async funtion than we have to use try and catch blog always
app.post("/login",async(req,res)=>{
     try
     {
             const email=req.body.email;
             const password=req.body.password;
             const useremail= await Register.findOne({email:email});
            // console.log(useremail.password);
            // res.send(useremail.password);
          if(useremail.password===password)
          {
             res.status(201).render("index");
          }
          else{
             res.status(200).send("password are not matching");
          }
            
     }
     catch(e)
     {
             res.send("invalide email");
     }
})


 app.get("*",async(req,res)=>{
      res.send("The page is not found");
 })
  
app.listen(port,()=>{
     console.log(`the server is running at ${port}`);
}
)