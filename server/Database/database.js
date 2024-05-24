const mongoose = require("mongoose");
const MONGO_URL=process.env.MONGO_URL
const connectDb=async()=>{
  try{
    await mongoose.connect("mongodb+srv://abhishek:abhishek@cluster0.gikozxp.mongodb.net/magnetBrains")
    console.log("Database connected");
  }catch(error){
    console.log(`Error in connecting with database ${error}`)
  }
}
module.exports = connectDb