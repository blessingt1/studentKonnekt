import express from "express";
import cors from "cors";
import mongoose from "mongoose"; // Corrected the import statement for mongoose

const app = express();
const port = 8000;

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

const uri = "mongodb+srv://dummy:connectSK24@cluster0.gx4dh.mongodb.net/"; // MongoDB URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Steps to use the routes for CRUD OPERATIONS
// Requiring the routes 
import router from './api/routes/assignment.routes.js'; // Ensure this import is present

// Telling the server to use these routes 
app.use('/assignment', router); // Loading everything in the assignment router for /assignment

//Steps to use the routes for CRUD OPERATIONS
//step 1: requiring the routes 
import userRouter from './api/routes/user.js';

//step 2: telling the server to use these routes 
app.use('/users', userRouter); // Corrected the path to use the user router for /users

// Serve the Swagger/OpenAPI specification
app.use('/swagger', (req, res) => {
    // Specify the path to the Swagger/OpenAPI file located in the 'docs' folder
    res.sendFile(path.join(__dirname, 'docs', 'swagger.yaml'));
});

// Catch-all route for handling 404 errors (not found)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
