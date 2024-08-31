//main feedback route

import express from "express";
import FeedbackCtrl from "../controllers/feedback.controller.js";

const router = express.Router();

router.route("/assignment/:id").get(FeedbackCtrl.apiGetFeedbacks);
router.route("/new").post(FeedbackCtrl.apiPostFeedback);//sends post request to /api/v1/feedback/new
router.route("/:id")
    .get(FeedbackCtrl.apiGetFeedback)
    .put(FeedbackCtrl.apiUpdateFeedback)
    .delete(FeedbackCtrl.apiDeleteFeedback);

export default router;