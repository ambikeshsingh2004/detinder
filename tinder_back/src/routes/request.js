const express = require("express");
const requestrouter = express.Router();
const { userauth } =  require("../middlewares/auth");
const User = require("../models/user")
const Connectionrequest = require("../models/connectionrequest")
requestrouter.post("/request/send/:status/:touserid",userauth,async(req,res)=>{
  //  this api is only for leftswipe and rightswipe meaning interested or ignored  to send request
  try{
    console.log("try was called in post of request")
    const status = req.params.status;
    const touserid = req.params.touserid;
    console.log(status)
    console.log(touserid)
    const fromuserid = req.user.id;
    console.log(fromuserid)
    // we must also validate touserid must exist on our db 
    //const touserid = req.params.touserid;
    const findalready = await User.findById(touserid);
    if(!findalready || (findalready._id === fromuserid)){
      // we cant send request to any random user
      return res.status(400).send("no such user exists");
    } 
    //const status  = req.params.status;
    const allowedstatus  = ["ignored","interested"];
    if(!allowedstatus.includes(status)){
      return res.status(400).json({message :"invalid status type"})
    }
    // we ll need to create compond index when we filter using two fields
   const existingconnectionrequest = await Connectionrequest.findOne({
    // pehle se hi x ne y ko toh nahi bhej rkha h ya y ne x ko toh nahi bhej rkha h 
    $or:[{fromuserid:fromuserid,touserid:touserid},
      {fromuserid:touserid,touserid:fromuserid,}]
   });

   if(existingconnectionrequest){
    return res.status(200).send("connection request already existes")
   }
   
    const connectionrequest = new Connectionrequest({
      fromuserid,
      touserid,
      status,
    })
     console.log('all valid till here')
    const data = await connectionrequest.save();
    console.log("all valid")
    res.status(200).send(data)
  }
  catch(err){
    console.log("error in request making function")
    res.status(400).send(err.message);
  }
 })
 requestrouter.post("/request/review/:status/:requestid",userauth,async(req,res)=>{
// to review request that we have got  on receivers end 
  try{
    const loggedinuser = req.user;
    const {status,requestid} = req.params
    const allowedstatus = ["accepted","rejected"];
    if(!allowedstatus.includes(status)){
     return res.status(400).send("not a valid status");
    }
    const connectionrequest = await Connectionrequest.findOne({
      _id:requestid,
      touserid:loggedinuser._id,
      status:"interested"
    });
    if(!connectionrequest){
      return res.status(400).send("connection request not found");
    }
    connectionrequest.status = status;
    await connectionrequest.save();
    res.status(200).send(connectionrequest);
    // validate the status
    // 
    // agar pehle se interested h tabhi reject, accept kr skte h warna agar ignored kuch nahi kr skte h 

  }
  catch(err){
    res.status(400).send(err.message);
  }
 })
// for post api we must act as security guard of our databse and someone is trying to add malicious data to our databse while get api call user authentication and authorization is necessary 
module.exports = requestrouter;