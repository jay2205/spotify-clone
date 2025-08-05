import express from 'express';
import dontenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'
import { fileUpload } from 'express-fileupload';
import path from 'path'

import { connectDB } from './lib/db.js';
import { userRoutes, authRoutes, adminRoutes, songRoutes, albumRoutes, statsRoutes } from './routes/index.js'

dontenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

//Middleware
app.use(express.json()) // to parse the JSON data.
app.use(clerkMiddleware())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB Max filesize
    }
}))

//Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port : ", PORT)
    connectDB();
})