import mongoose from 'mongoose';

const dbConnection= async ()=>{
try {
    await mongoose.connect(process.env.MONGO_URL,{});
    console.log("MongoDB Connected....");
} catch (error) {
    console.log("MongoDB Connection failed",error.message);
    process.exit(1);
}
}

export default dbConnection;