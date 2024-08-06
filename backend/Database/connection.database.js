import mongoose from "mongoose";
import { config } from "dotenv";
config();

const URL = process.env.CONNECTION_STRING;

export const connectDatabase = async function(callback){
    try {
        const client = await mongoose.connect(URL);
        console.log("Database connected Successfully");
        callback();
    } catch (error) {
        console.log("Error connecting MongoDb Database...",error);
    }
}