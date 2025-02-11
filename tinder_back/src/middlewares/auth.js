 const jwt = require("jsonwebtoken");
 const User = require("../models/user")

const userauth = async (req,res,next)=>{
 // read the token and find the user 
 
 try{
  const {token} = req.cookies;
  console.log(token)
  if(!token){
   return res.status(401).send("please login")
  }

 const decoded =  jwt.verify(token,"my secret key")
  const { _id } = decoded;
  console.log(token);
  console.log(_id);
 const user = await User.findById(_id);
 if(!user){
  throw new Error("user was not found");
 }
 req.user = user;
 next();
 }
 catch(err){
  console.log("error in userauth")
  //next(err);
  res.status(400).send("bad request    " + err.message);
 }
}
module.exports = {userauth}