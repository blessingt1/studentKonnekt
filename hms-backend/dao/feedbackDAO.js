//main feedback data access objects with functions to call by api function creation

// Importing the required module from 'mongodb'
import { ObjectId } from 'mongodb'; // Changed: Importing ObjectId correctly from 'mongodb'

let feedbacks;

export default class FeedbackDAO {
    // Initialize database connection and collection
    static async injectDB(conn) {
        if (feedbacks) {
            return;
        }
        try {
            feedbacks = await conn.db("hms").collection("feedbacks");
        } catch (e) {
            console.error(`Unable to establish collection handles in FeedbackDAO: ${e}`);
        }
    }

    // Add a new feedback document
    static async addFeedback(assignmentId, lecturer, feedback) {
        try {
            const feedbackDoc = {
                assignmentId: new ObjectId(assignmentId), // Changed: Use new ObjectId() to create ObjectId instance
                lecturer: lecturer,
                feedback: feedback,
            };
            return await feedbacks.insertOne(feedbackDoc);
        } catch (e) {
            console.error(`Unable to post feedback: ${e}`);
            return { error: e };
        }
    }

    // Retrieve feedback document by its ID
    static async getFeedback(feedbackId) {
        try {
            return await feedbacks.findOne({ _id: new ObjectId(feedbackId) }); // Changed: Use new ObjectId() to create ObjectId instance
        } catch (e) {
            console.error(`Unable to get feedback: ${e}`);
            return { error: e };
        }
    }

    // Update a feedback document by its ID
    static async updateFeedback(feedbackId, lecturer, feedback) {
        try {
            const updateResponse = await feedbacks.updateOne(
                { _id: new ObjectId(feedbackId) }, // Changed: Use new ObjectId() to create ObjectId instance
                { $set: { lecturer: lecturer, feedback: feedback } }
            );
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update feedback: ${e}`);
            return { error: e };
        }
    }

    // Delete a feedback document by its ID
    static async deleteFeedback(feedbackId) {
        try {
            const deleteResponse = await feedbacks.deleteOne({
                _id: new ObjectId(feedbackId), // Changed: Use new ObjectId() to create ObjectId instance
            });
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete feedback: ${e}`);
            return { error: e };
        }
    }

    // Retrieve feedback documents by assignment ID
    static async getFeedbacksByAssignmentId(assignmentId) {
        try {
            const cursor = await feedbacks.find({ assignmentId: new ObjectId(assignmentId) }); // Changed: Use new ObjectId() to create ObjectId instance
            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to get feedback: ${e}`);
            return { error: e };
        }
    }
}