import mongoose from "mongoose";

export async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on("error", (error) => {
            console.log("Error connecting to DB: ", error);
        });
        connection.once("connected", () => {
            console.log("Connected to DB successfully!", process.env.MONGO_URI!);
        })
    } catch (error) {
        console.log("Error connecting to DB: ", error);
    }
}