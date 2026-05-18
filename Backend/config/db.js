import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Db connected..")
    )
  } catch (error) {
    console.error("db connection error", error);
    setTimeout(connectDb, 4000);
  }
}

export default connectDb