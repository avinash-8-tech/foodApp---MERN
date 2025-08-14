import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Is Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}