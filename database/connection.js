import mongoose from "mongoose";

// database connection to the atlas
export const conntectDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("DB connected");
    }).catch((e) => {
        console.log("Eroor happed during DB connection", e);
    })
}
