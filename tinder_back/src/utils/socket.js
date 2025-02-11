const socket = require("socket.io")
const crypto = require("crypto")
const {Chat} = require("../models/chat")

const gethash = (userId,targetuserid)=>{
 return crypto.createHash("sha256").update([userId,targetuserid].sort().join("_")).digest("hex");
}
const initializesocket = (server)=>{
  const io = socket(server,{
  cors:{
    origin:"http://localhost:5173",
  }
})
;
io.on("connection",(socket)=>{
  // handle events
  socket.on("joinChat",({firstname, userId ,targetuserid})=>{
    // a chat always happen in a room if two users want to chat they must be in same rooms whilw each room must have a unique id
  const roomId = gethash(userId,targetuserid);
  socket.join(roomId);

    
  })
   socket.on("sendMessage",async({firstname,userId,targetuserid,text ,lastname})=>{
    console.log(userId)
     const roomId = gethash(userId,targetuserid);
     console.log(roomId)
     console.log(firstname,userId,text)
     try{

     let chat = await Chat.findOne({
      participants:{$all:[userId,targetuserid]},
      // above query means  jo array ke anadr h woh sabhi participants me hone chahiye
     });
     if(!chat){
      // these two people are chatiing for first time
      chat = new Chat({
        participants:[userId,targetuserid],
        messages:[],
      })
     }
     chat.messages.push({
      senderId:userId,
      text,
     })
     await chat.save();



     }catch(err){
      console.log(err.message)
     }
     io.to(roomId).emit("messageReceived",{firstname,lastname,text})
     

  })
  socket.on("disconnect",()=>{

  })
 
})
}
module.exports = initializesocket;