const validator = require("validator")
const validatesignupdata = (req)=>{
  const {firstname,lastname,emailid,password} = req.body;
  if(!firstname || !lastname){
    throw new Error("not valid name");
  }
  else if(!validator.isEmail(emailid)){
  throw new Error("email is not valid")
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("weak password");
  }
};
const validateprofiledata =async (req)=>{
  // we wont allow user to change email 
  const allowededitfields =  ["photourl","about","gender","age","skills","firstname","lastname"];
  const isupdate_allowed = Object.keys(req.body).every((k)=>allowededitfields.includes(k));
 
  return isupdate_allowed

}
module.exports = {validatesignupdata,validateprofiledata}