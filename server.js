import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Corrected path for lecturer routes
import lecturerRoutes from './api/routes/lecturer/lecturer.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Mount the lecturer routes
app.use("/api/v1/lecturer", lecturerRoutes);

// Serve Swagger documentation
app.use('/swagger', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'swagger.yaml'));
});

// Catch-all route for 404 errors
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// MongoDB connection string from the .env file
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/yourDatabaseName";

// Connect to MongoDB with Mongoose
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

export default app;
