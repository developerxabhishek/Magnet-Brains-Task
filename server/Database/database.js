const mongoose = require("mongoose");

const connectDb=async()=>{
  try{
    // I have create this account only for this project that the reaon why i am providing the database but you can change it as well as per your requirement....
    await mongoose.connect("mongodb+srv://abhishek:abhishek@cluster0.gikozxp.mongodb.net/magnetBrains")
    console.log("Database connected");
  }catch(error){
    console.log(`Error in connecting with database ${error}`)
  }
}
module.exports = connectDb