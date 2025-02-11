const express = require("express");
const {connectdb }= require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
const {validatesignupdata} = require("./utils/validation")
const bcrypt = require("bcrypt")
const http= require("http")
const user = require("./models/user");
const jwt = require("jsonwebtoken");
const { userauth} =  require("./middlewares/auth")

const cors  = require("cors")
 require("dotenv").config();

app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials:true
  }
));
app.use(express.json());
app.use(cookieParser());

// middlewares to parse cookie and json data sent via body

const authrouter = require("./routes/auth");
const profilerouter = require("./routes/profile");
const requestrouter = require("./routes/request");
const userrouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const initializesocket = require("./utils/socket");
const chatRouter = require("./routes/chat");
app.use("/",authrouter);
// agar request me / h toh sbme check krega jisme / lga hua h
// agar aapne / request bheja toh pehle woh upar ke done me check krega fir hi neeche wale me jayega 
app.use("/",profilerouter);
app.use("/",requestrouter);
app.use("/",userrouter);
app.use("/",paymentRouter);
app.use("/",chatRouter);



// gets a user with particular email
app.get("/user",async(req,res)=>{
  // we must know which moel are we using to fetch data
  // aur woh model apne file me import rehna chahiye 
  const useremail = req.body.email;
  console.log(useremail);
  try{
    const uuser = await user.findOne({emailid:useremail});
    if(!uuser)  
      {
        res.status(404).send("couldnt find user");
      }
      else {

        res.send(uuser);
      }
    
  }
  catch(err){
    res.status(400).send("something went wrong");
  }

})

// gets all the users 
app.get("/feed",async(req,res)=>{
  // we must know which moel are we using to fetch data
  // aur woh model apne file me import rehna chahiye 
  // const useremail = req.body.email;
  // console.log(useremail);
  try{
    const uuser = await user.find({});
    if(!uuser)  
      {
        res.status(404).send("couldnt find user");
      }
      else {

        res.send(uuser,);
      }
    
  }
  catch(err){
    res.status(400).send("something went wrong");
  }

})

// delete a user by user id
app.delete("/user",async(req,res)=>{
const userid = req.body.userid;
try{
  const uuser = await user.findByIdAndDelete(userid);
  res.send("user deleted suuccesfully")
}
catch(err){
  res.status(400).send("something went wrong");
}
})

// update the data of user
// isme hmne api level sanitization and validation krte h 
app.patch("/user/:userid", async(req,res)=>{
  // if i am passing something which isnt present in schema they will be ignored by databse
  const userid = req.params.userid;
const data = req.body;
const allowed_updates = ["photourl","about","gender","age","skills"]
try{
  // object .keys me hm jo bhi object pass krte h usse woh ek array return krta h jisme sare keys as a string hoti h 
  // aur fir sbke ke liye check krte h ki woh us array me h aur maanlo woh shuru me sisupdate_aloowed me true rkhta h aur jaise bhi koi nahi mila use false se and kr deta h agar mila toh true se and kr deta h 
  const isupdate_allowed = Object.keys(data).every((k)=>allowed_updates.includes(k));
  // above line check kr rha h ki saare diye hue fiels allowed_update array se hi h agar ek bhi bahar se hua toh isallowed_updates false ho jayega 
  if(!isupdate_allowed) throw new Error ("update not allowed") ;
  if(data?.skills.length > 10) throw new Error("at max 10 skills are allowed")
// but we shouldnt allow changing user id but we need it to update the data so on upcoming episodes 
// Therefore, isupdate_allowed will be true only if all keys in data are present in allowed_updates.
  const u = await user.findByIdAndUpdate({_id:userid},data,{runValidators:true});
  console.log(u);
  res.send("user updated successfully");
}
catch(err){
  res.status(400).send("coulndt update" + err.message);
}
})




const server = http.createServer(app);
initializesocket(server);


connectdb().then(()=>{
 // first we should connect to databse and then listen to server cause if databse isnt connected and server starts to listen we ll fail miserably
  console.log("dataabse connected successfully")
  server.listen(4444,(req,res)=>{
    console.log("server started on 4444");
  })
}).catch((err)=>{
  console.log("databse cant be cocnnected ")
});


