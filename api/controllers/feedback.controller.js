//our main feedback controller

//importing functions to use for api requests
import FeedbackDAO from "../../dao/feedbackDAO.js";

//feedback controller class to export for api functions
export default class FeedbackController {
    // Create feedback
    static async apiPostFeedback(req, res, next) {
        try {
            const assignmentId = req.body.assignmentId;
            const feedback = req.body.feedback;
            const lecturer = req.body.lecturer;

            const feedbackResponse = await FeedbackDAO.addFeedback(
                assignmentId,
                lecturer,
                feedback
            );
            res.json({ status: "success" });
        } catch (ewi) {
            res.status(500).json({ error: e.message });
        }
    }

    // Get feedback by ID
    static async apiGetFeedback(req, res, next) {
        try {
            let id = req.params.id || {};
            let feedback = await FeedbackDAO.getFeedback(id);
            if (!feedback) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(feedback);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    // Update feedback
    static async apiUpdateFeedback(req, res, next) {
        try {
            const feedbackId = req.params.id;
            const feedback = req.body.feedback;
            const lecturer = req.body.lecturer;

            const feedbackResponse = await FeedbackDAO.updateFeedback(
                feedbackId,
                lecturer,
                feedback
            );

            if (feedbackResponse.modifiedCount === 0) {
                throw new Error("unable to update feedback");
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Delete feedback
    static async apiDeleteFeedback(req, res, next) {
        try {
            const feedbackId = req.params.id;
            const feedbackResponse = await FeedbackDAO.deleteFeedback(feedbackId);
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Get feedback list by assignment ID
    static async apiGetFeedbacks(req, res, next) {
        try {
            let id = req.params.id || {};
            let feedbacks = await FeedbackDAO.getFeedbacksByAssignmentId(id);
            if (!feedbacks) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(feedbacks);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
}