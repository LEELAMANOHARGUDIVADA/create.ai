import mongoose from "mongoose"

const connectDB = (url) => {
    mongoose.connect(url).then(
        console.log("MONGODB CONNECTED!")
    ).catch(err => (
        console.log("Error Connecting MongoDB:", err)
    ));
};

export default connectDB;

