import mongoose from "mongoose";

let connected = false;

export async function connect() {
    if (connected) return;

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not present in the environment variables!");
    }

    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
}
