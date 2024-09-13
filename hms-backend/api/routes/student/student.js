const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');
const Assignment = require('../../models/Assignment');

router.get('/View%20Assignments', (req, res, next) => {
    Assignment.find()
    .exec()
    .then(result => {
        console.log(result);
        if (result.length >= 0) {
            res.status(200).json(result);
        }
        else {
            res.status(500).json({
                message: 'No assignment found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

router.get('/:assignmentId', (req, res, next) => {
    const id = req.body.assignmentId;
    Assignment.findById(id)
    .exec()
    .then(result => {
        console.log(result);
        if (result){
            res.status(200).json(result);
        }
        else {
            res.status(404).json({
                message: 'No valid entry found for the provided ID'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;