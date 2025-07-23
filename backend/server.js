
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import userAccount from './routes/accountRoutes.js';
import videoRouter from './routes/videoRoutes.js';
import channelRouter from './routes/channelRoutes.js';
import commentsRouter from './routes/commentsRoutes.js';
import tagsRouter from './routes/tagsRoutes.js';

dotenv.config();
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
          );
        console.log(`MongoDB connected Successfully `);
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1); // Exit the process with failure
    }
};

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173", // for local dev
    "https://whimsical-semolina-802b74.netlify.app", // Netlify live frontend
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());



app.use("/api/v1/account", userAccount);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/channel",channelRouter)
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/tags', tagsRouter);


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 7000, () => {
            console.log(`Server is running at port : ${process.env.PORT || 7000}`);
        });
    })
    .catch((err) => {
        console.error("Error starting the server:", err);
    });


app.get('/', (req, res) =>{
    res.send('Api server is running....');
});