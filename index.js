import app from "./server.js";
import mongodb from "mongodb";
import FeedbackDAO from "./dao/feedbackDAO.js";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = 8000; // Define the port on which the server will listen

// MongoDB database connection
MongoClient.connect(
    "mongodb+srv://dummy:connectSK24@cluster0.gx4dh.mongodb.net/", // MongoDB URI
    {
        maxPoolSize: 50, // Maximum number of connections in the connection pool
        wtimeoutMS: 2500, // Timeout in milliseconds for write operations
    }
)
.catch(err => {
    // Log any errors that occur during connection
    console.error("Failed to connect to MongoDB:", err.stack);
    process.exit(1); // Exit the process if the connection fails
})
.then(async client => {
    // Initialize DAO with the connected MongoDB client
    await FeedbackDAO.injectDB(client);

    // Start the server and listen on the specified port
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});






