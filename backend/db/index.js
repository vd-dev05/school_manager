// connect db
import mongoose  from "mongoose";   

export const ConnectDb  = {
   mongoose : async () => {
    try {
      mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

    } catch (error) {
        console.log(error);
        
    }
   }
}