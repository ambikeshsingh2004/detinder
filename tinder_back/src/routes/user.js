const express = require("express")
const { userauth } =  require("../middlewares/auth");
const User  = require("../models/user.js")
const userrouter = express.Router();
const Connectionrequest = require("../models/connectionrequest")
userrouter.get("/user/requests/received",userauth,async(req,res)=>{
  // get all pending requests 
  // only interested requests made by someone to us which havent been handled by us 
  try{
   const loggedinuser = req.user;
   const pendingrequest = await Connectionrequest.find({
    touserid:loggedinuser._id,
    status:"interested"
   }).populate("fromuserid",["firstname","lastname","age","gender","about","photourl"]);
   console.log(pendingrequest)
   res.status(200).send(pendingrequest);

  }
  catch(err){
    res.status(400).send(err.message);
  }
  /*
  pehle aise dikhta tha 
  {
  "_id": "123456",
  "fromuserid": "507f1f77bcf86cd799439011",  // ObjectId
  "touserid": "507f1f77bcf86cd799439022",  // ObjectId
  "status": "interested"
}
ab aisa dikhega 
{
  "_id": "123456",
  "fromuserid": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "touserid": "507f1f77bcf86cd799439022",
  "status": "interested"
}

  */

})
userrouter.get("/user/connections",userauth,async(req,res)=>{
  try{
    // get all connectios for current user users who has accepted our request 
    const loggedinuser = req.user;
    const connectionrequest = await Connectionrequest.find({
      $or:[{touserid:loggedinuser._id,status:"accepted"},{fromuserid:loggedinuser._id,status:"accepted"}]
    }).populate("fromuserid",["firstname","lastname","age","gender","about","photourl"]).populate("touserid",["firstname","lastname","age","gender","about","photourl"]);
    // connection request has redundant data 
    // either fromuserid will be logged iin or to userid will be logged in

    const data = connectionrequest.map((row)=>{
       if(row.fromuserid._id.toString() === loggedinuser._id.toString()){
        // jis request o hmne bheji agar woh accept hui
        return row.touserid;
       }
       // jis request ko saamne wale ne bheji woh accept hui
       return row.fromuserid;
    }
  )
    res.status(200).send(data);
  }
  catch(err){
    res.status(400).send(err.message);
  }
})
userrouter.get("/feed",userauth,async(req,res)=>{
  // jisko ignore kia h ys jisko interest kia  h ya jisse already connected h
// one must see card of people to whom 
// i have already not sent request to and 
//not his profile too and
 //ignored people 
 // his connections too must not be shown
 // not show ,own card,ignored,interested,and my connections

try{
  // page and limit will be strings so we need to convert thrm into int 
  console.log("feed api was called")
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  const loggedinuser = req.user;
   limit = limit > 50?10:limit;
  let skip = (page-1)*limit;
  const allconnectionrequest =await Connectionrequest.find({
    $or:[{fromuserid:loggedinuser._id},{touserid:loggedinuser._id}]
  }).select("fromuserid touserid")
  // skip skips a few objects while limit make sures it has only  or less than given numbers
  const hideusers = new Set();
 
  allconnectionrequest.forEach((req)=>{
    hideusers.add(req.fromuserid.toString());
    hideusers.add(req.touserid.toString());

  });
  // always sanitize data from frontend
  // nin -> not in,,ne -> not equals to 
  const users = await User.find({$and:[{_id:{$nin:Array.from(hideusers)}},{_id:{$ne:loggedinuser._id}}]}).select("firstname lastname age gender about photourl").skip(skip).limit(limit);
  res.status(200).send(users)



}
catch(err){
res.status(400).send(err.message);
}
}
)


module.exports  = userrouter;