const mongoose = require("mongoose");
//
const connectionrequestschema = new mongoose.Schema({
  fromuserid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  touserid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  status:{
    type:String,
    required:true,
    // we create enum when we want a property to be from a few values only 
    enum:{
      values:["ignore","interested","accepted","rejected"],
      // message will be thrown jb value upar wallon se nahi hogi
      message:"${VALUE} is not one of available options for status"
    }
  }
},{
  timestamps:true,
  // adds updated at created at 
});

// pre is kind of middlewares
connectionrequestschema.index({fromuserid:1,touserid:1})
//indexing makes querying from databse fast and efficient any fied which is unique will make  it indexed
// when we are queerying values which exist in pair we need to index them both 
// 1 means ascending while -1 means descending 
// why dont we create a lot of index or on all features ?
connectionrequestschema.pre("save",function(next){
  // whenever we save the data this middleware function will be called before saving data to database
  // ids are not string instead mongoobject
 const connectionrequest = this;
 if(connectionrequest.fromuserid.equals(connectionrequest.touserid)){
  throw new Error("u cannot send connection request to urself");
 }
 next();
})
const Connectionrequest = new mongoose.model("Connectionrequest",connectionrequestschema);
module.exports = Connectionrequest;