import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URI);
        console.log(`MonogoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log('MongoDB connection Failed: ', error);
    }
}

export default connectDB;
