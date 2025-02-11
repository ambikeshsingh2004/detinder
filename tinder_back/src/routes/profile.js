const express = require("express");
const profilerouter = express.Router();
const { userauth } =  require("../middlewares/auth");
const {validateprofiledata} = require("../utils/validation")
profilerouter.get("/profile", userauth ,async(req,res)=>{
  try{
  
   const user = req.user;
   // way to access somrthing from request 
   console.log(user);
   res.send(user);
  }
  catch(err){
    console.log("was error in get profile")
   console.log(err.message)
  }
 
 })
profilerouter.patch("/profile/edit",userauth,async(req,res)=>{

  try{
    if(!validateprofiledata(req)){
      throw new Error("invalid edit request")
    }
    else{
      console.log("i was is else block")
      const olduser = req.user;
      console.log(olduser)
      console.log(req.body);
     // Object.keys(req.body).forEach((key)=>{olduser[key] = req.body[key]});
      Object.keys(req.body).forEach((key) => {
  //if (allowedFields.includes(key) && !protectedFields.includes(key)) {
    // Check if the key is 'age' and convert it to a number
    if (key === 'age') {
      olduser[key] = Number(req.body[key]); // convert age to number
    } else {
      olduser[key] = req.body[key]; // convert other fields to string
    }
  
 });
  console.log("hi")
      await olduser.save();
      console.log(olduser)
      // we can call .save on instances of model only nont on any random object since this user was model created in middleware/auth.js so this is a instance of model only then we are able to run save command on this 
      res.status(200).send(olduser)
    }
  }
  catch(err){
    console.log("found error")
  res.status(401).send(err.message)
  }
 })

module.exports = profilerouter;