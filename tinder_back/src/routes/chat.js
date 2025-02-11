const express = require("express");
const {Chat} = require("../models/chat");
const { userauth } = require("../middlewares/auth");
const chatRouter = express.Router();
chatRouter.get("/chat/:targetuserid",userauth,async(req , res)=>{
  const {targetuserid} = req.params;
   const userId = req.user._id;
   console.log("userid" ,userId);
  try{
    //console.log(userId,targetuserid)
    let chat = await Chat.findOne({
      participants: { $all : [userId,targetuserid]},
    }).populate({
      path:"messages.senderId",
      select:"firstname lastname"
    }).exec();
    if(!chat){
      chat = new Chat({
        participants:[userId,targetuserid],
        messages:[],
      });
      await chat.save();
    }
    //console.log(chat);
    res.json(chat);

  }catch(err){
    console.log("chat route error")
    console.log(err.message);
  }

})

module.exports = chatRouter;