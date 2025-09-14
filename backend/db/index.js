// connect db
import mongoose  from "mongoose";   

export const ConnectDb  = {
   mongoose : async () => {
    try {
      console.log("🔄 Connecting to MongoDB... and token " + process.env.MONGODB_URL);
      mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
      useUnifiedTopology: true,
      })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

    } catch (error) {
        console.log(error);
        
    }
   }
}