const express = require("express");
const router = express.Router();
const {validatesignupdata} = require("../utils/validation")
const bcrypt = require("bcrypt")
const user = require("../models/user");
// signs up a user,ispe hmne password pe encryption bhi lgaya 
router.post("/signup",async(req,res)=>{
  // express converts incoming request into an object called req
  // our server isnt able to read json data hence we ll need to use middlewares
  // it will convert json of req.body into jso and attach it into req.body 
  // first we must validate data before validating the password and then encrypt the password 
 
  const userobj = new user(req.body)
  console.log(req.body);
try{
  validatesignupdata(req);
  const {password,firstname,lastname,emailid,photourl }= req.body
  const hashpassword = await bcrypt.hash(password,10);
  console.log(hashpassword);

  const User = new user({
    firstname,
    lastname,
    emailid,
    password:hashpassword,
  //  photourl

  });
  await User.save();
  const token = await User.getJWT();
      console.log(User._id)
      console.log("token   " + token);
      res.cookie("token",token);
  res.send(User)
}
catch(err){
  console.log("couldnt save"+err.message)
  res.status(400).send(err.message);
}

})
// login with email and password
router.post("/login",async(req,res)=>{
  try{
    const {emailid,password} =  req.body;
    // first we ll check if users who is trying to  login is present in database or not only then we will check for password 
    const uuser = await user.findOne({emailid:emailid});
    console.log(uuser)
    if(!uuser){
      throw new Error("not a valid email");
    }
    

    const isvalidpassword = await uuser.validatepassword(password);
    if(isvalidpassword){
      const token = await uuser.getJWT();
      console.log(uuser._id)
      console.log("token   " + token);
      res.cookie("token",token);
      // hm cookie ko jb chahe tb expire bhi kra skte h
      console.log("everything was ok in login")
      res.send(
       
        uuser
      )
      // create a token sent it along  with cookie
      // token is didtinct for distinct users 
    }
    else {
      throw new Error("wrong password")
      
    }
  }
  catch(err){
    console.log(err.message);
    res.status(400).send(err.message)
  }
})
router.post("/logout",async(req,res)=>{
  // we are clearing cookies so user will need to login again
  console.log('logout was called');
  res.cookie("token",null,{expires:new Date(Date.now()),});
 
  res.status(200).send("logged out successfully");
})

module.exports = router;