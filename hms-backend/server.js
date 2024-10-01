import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

dotenv.config();

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://dummy:connectSK24@cluster0.gx4dh.mongodb.net/"; // Make sure to include your database name
mongoose.connect(uri)
    .then(() => {
        console.log("MongoDB database connection established successfully");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });



// Routes
import router from './api/routes/assignment.routes.js';
import userRouter from './api/routes/user.js';
import submissionRouter from './api/routes/student/student.js';

app.use('/assignments', router);
app.use('/users', userRouter);
app.use('/submissions', submissionRouter);

// Swagger setup
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Catch-all route for handling 404 errors (not found)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

app.listen(port, () => {
    console.log(Server is running on port: ${port});
});//push