const express = require("express");
const { userauth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay")
const Payment = require("../models/payment");
const {membershipAmount} = require("../utils/constants");
const payment = require("../models/payment");
const User = require("../models/user")
//console.log(razorpayInstance)
paymentRouter.post("/payment/create",userauth,async(req,res)=>{
  try{ 
    
    const {membershipType} = req.body;
    const{firstname,lastname,emailid} = req.user;

  const order = await  razorpayInstance.orders.create({
      amount:membershipAmount[membershipType]*100,
      currency:"INR",
      receipt:"receipt#1",
     
      notes:{
        firstname,
        lastname,emailid,
        membershipType:membershipType,
      },
    })

// console.log(order)
// save details in db and return order details to frontend
const payment = new Payment({
  userId:req.user._id,
  orderId:order.id,
  status:order.status,
  amount:order.amount,
  currency:order.currency,
  receipt:order.receipt,
  notes:order.notes,
})
const savepayment=  await payment.save();
console.log(savepayment)
console.log("above was for create payment")
res.json({...savepayment.toJSON(),keyId:process.env.RAZORPAY_KEY_ID});

  }catch(err){
    console.log(err);
    res.send(err).status(400);
  }
})
// below api will be called by razorpay
// paymentRouter.post("/payment/webhook",async(req,res)=>{
//   // webhooks are a way to verify paymemnts because they call live api not on localhost hence we ll use other way
//   // either they can be successful or failed payments and at same time create or refund started 
//   // razpay will make post call 

//  try{
//     //validatewbhooksignuatur/
//     const webhooksignature = req.get("x-razorpay-signature")
//     // validatewebhhoksignature comes from 'razorpay/dist/utils/razorpay-utils
//    const iswebhookvalid =  validatewebhhoksignature(
//       json.stringify(req.body)
//       WebhookSignature,//rzpay send us headers which needs to verified 
//       process.env.razorpay_webhokok_secret
//        webhook_secret is created by us when we create webhook
//     );
//     if(!webhookvalid)return not valid web hook;
//      if webhook is valid then we need to figure out if payment is captured or failed
      //if(req.body.event === 'payment.captured'){
       // update payment status  and make user premium and 
       // we also need to return an response to webhook otherwise it will keep bugiing us 
       // and we must sent 200 status to them
      //}
      // if(req.body.event === 'payment failed'){
       // within
     //  const paymentdetails = req.body.payload.payment.entity like order id and many more things related to our order
     // captured for successfula payments while created when order has just created neither failed nor succeeded
      // payment.status =  paymentdetails.status;
      // await payment.save();
      // const user  = await user.findone({_id:payment.id})
      // user.ispremium = true;
      // user.membershiptype = payment.notes.mambershiptype;
      //await user.save();
      // }
//  }catch(err){

//  }
// })
// 

paymentRouter.post("/premium/verify",userauth,async(req,res)=>{
  console.log("veryfy premium was called ")
 console.log(req.body)
  const { payment_id,order_id }= req.body;

  //console.log(order);
  const user = req.user.toJSON();
  try{
    //const {razorpay_order_id} = req.body;
    const orderInfo = await razorpayInstance.payments.fetch(payment_id);

    console.log(orderInfo);
    const p =await Payment.findOne({orderId:order_id}).populate("userId");
    console.log(p)
    //p.status=
    if(orderInfo.status === 'captured'){
      // upar tk hua h
      p.status = 'captured';
      await p.save();
      let user = p.userId;
      user.isPremium = true;
      await p.save();
      console.log(p);
      //const transactionData = await payment.findById(orderInfo.receipt)
      // if(transactionData.payment){
      //   return res.json({success:false,message:'Payment Failed'})
      // }
      // const userData = await userModel.findById(transactionData.userID)
      // const creditBalance = userData.creditBalance + transactionData.credits;
      // await userModel.findByIdAndUpdate(userData._id,{creditBalance})
      // await transactionModel.findById(transactionData._id,{payment:true})
      res.json({success:true,message:"Pyament Success"})
    }
    else{
      res.json({success:false,message:"Payments Failed"})
    }

  }catch(err){
    console.log(err);
    res.json({success:false,message:err.message})
  }


  // if(user.isPremium){
  //   return res.json({isPremium:true});
  // }
  // return res.json({isPremium:false});
})
const verifyRazorpay = async(req,res)=>{
  const order = req.body;
  console.log(order);
  const user = req.user.toJSON();
  try{
    const {razorpay_order_id} = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status === 'paid'){
      const transactionData = await payment.findById(orderInfo.receipt)
      if(transactionData.payment){
        return res.json({success:false,message:'Payment Failed'})
      }
      // const userData = await userModel.findById(transactionData.userID)
      // const creditBalance = userData.creditBalance + transactionData.credits;
      // await userModel.findByIdAndUpdate(userData._id,{creditBalance})
      // await transactionModel.findById(transactionData._id,{payment:true})
      res.json({success:true,message:"Pyament Success"})
    }
    else{
      res.json({success:false,message:"Payments Failed"})
    }

  }catch(err){
    console.log(err);
    res.json({success:false,message:err.message})
  }
}
module.exports = paymentRouter;