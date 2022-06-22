import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/authRoutes.js"
import userRoute from "./routes/userRoutes.js"
import hotelRoute from "./routes/hotelRoutes.js"
import roomRoute from "./routes/roomRoutes.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()

dotenv.config()

const konek = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB!");
    } catch (error) {
        throw error
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
})

//middlewares

app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/room", roomRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"

    return res.status(errorStatus).json({
        succes: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, () => {
    konek()
    console.log("Connected to Backend!");
})