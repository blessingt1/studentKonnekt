const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');
const Assignment = require('../../models/Assignment');

router.get('/:assignmentId', (req, res, next) => {
    const id = req.body.assignmentId;
    Assignment.findById(id)
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;