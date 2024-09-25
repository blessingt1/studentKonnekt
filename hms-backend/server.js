import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Derive the filename and directory name from the ES module URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());


// Serve the Swagger/OpenAPI specification
app.use('/swagger', (req, res) => {
    // Specify the path to the Swagger/OpenAPI file located in the 'docs' folder
    res.sendFile(path.join(__dirname, 'docs', 'swagger.yaml'));
});

// Catch-all route for handling 404 errors (not found)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// Export the app for use in other modules or for starting the server
export default app;