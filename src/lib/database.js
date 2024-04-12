import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch(error) {
    console.log(error);
  }
}

export async function executeDbCall(promiseCallback) {
  try {
    await connectToDB();
    return await promiseCallback();
  } catch(error) {
    console.log(error);
    throw error;
  }
}
