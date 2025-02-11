const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
// jb schema se error throw ho jata h tb woh database me update aur add nahi hota 
const userSchema =new mongoose.Schema
({
  firstname:{
    type:String,
   // index:true,
    required:true,
    minLength:4,
    maxLength:40,
  },
  lastname:{
    type:String
  },
  emailid:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    // will convert email ids to lowercase and should also trim spaces at back and end;
    trim:true,
    validate(value){
      if(!validator.isEmail(value))
      { // schema level validation of email
        throw new Error("invalid email address" + value)
      }

    }
  },
  password:{
    type:String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value))
      { // schema level validation of password
        throw new Error("not strong password" + value)
      }

    }
  },
  age:{
    type:Number,
    min:18,

  },
  gender:{
    type:String,
    // how to create a custom validate function
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("not a valid gender");
        // if this function throws error then value wont be updated with given data 
        // by default this will only be called if a new document is added and wont be called if a document is being updated 
      }
      
    }
  },
  isPremium:{
    type:Boolean,
    default:false,
  },
  membershipType:{
   type:String,
   
  },
  photourl:{
    type:String,
    default:"https://i.redd.it/instagram-default-user-profile-pic-flip-flops-v0-g983oflfeg4d1.jpg?width=262&format=pjpg&auto=webp&s=c6ec2305199c633fc6d460238d0409f41812fe75",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("not a valid photo url" + value);
      }
    }
  },
  about:{
    type:String,
    default:"this is default about of user"
    // so if we dont provide clear about it will take it by default 
  },
  skills:{
    type:[String],
    // in skills we ll need to pass array of strings 

  },
},{
  timestamps:true,
  // will add created at updated at in our document we must always add this one 
});
userSchema.methods.getJWT = async function(){
  // cannot write this functinn as arrow
  // this and below function will be attcahed with every user and can call whenevre we wish 
  // we cant use arrow functions for below functions 
  const user = this;
  const token = await jwt.sign({ _id:user._id},"my secret key",{
    // yha pe expires in ,validity of token likhenge tokennexpire hoga
    // we should always expire token cause if we login in public  computers and dont logout it can be used by others for wrong purposes
  })
  return token;
}
userSchema.methods.validatepassword = async function(p){
  const user = this;
  const hashpassword = user.password;
  const isvalidpassword  = await bcrypt.compare(p,hashpassword)
  // in above function first one must be normal password while second one must be hashed one otherwise it wont work 

  return isvalidpassword;
}
// below code is to create a modee
// models name must start with capitala
const Usermodel = mongoose.model("User",userSchema);
module.exports = Usermodel;