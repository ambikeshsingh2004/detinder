const mongoose = require('mongoose');


const connectdb  = async()=>{
  mongoose.connect("mongodb+srv://ambikeshsingh367:3lUtAERWmWZlRG6L@cluster0.vmopx.mongodb.net/devtinder");
  // agar / nahi h toh poore cluster se connect hoga lekin/ ke baad jo h usi databse se connect hoga 
  //mongodb+srv://thor81099:<db_password>@cluster0.8bq9y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 // jo last me slash h agar uske baad koi naam likha toh us databse se bss connet hoga 
 // we must first connect to databse and only then listen for requests
 //mongodb+srv://ambikeshsingh367:<db_password>@cluster0.vmopx.mongodb.net/
 //mongodb+srv://ambikeshsingh367:3lUtAERWmWZlRG6L@cluster0.vmopx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
}


//

module.exports =  {connectdb};
