import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set('strict', true); // Correct the property name to 'strict'

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "sharePrompt",
        });
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error); // Use console.error for better error handling
    }
}