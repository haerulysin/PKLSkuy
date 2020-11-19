const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const jwtDecode = require('jwt-decode');

//model

const userReview = require('../models/review.model');

// @route GET /api/projectList/
// @desc GET ALL PROJECTLISST
// @access Public
router.route('/').get((req, res) => {

    userReview.find({}).populate("from to", '-auth').then(data => {
        return res.status(200).json({ status: 1, data: data });
    })
        .catch(err => {
            res.status(400).json({ status: 0, message: err })
        })
});

router.route('/').post((req, res) => {


    const reqData = req.body;
    reqData.comments = req.body.comments || " "
    const newUserReview = new userReview(reqData);
    newUserReview.save()
        .then(data => {
            return res.status(200).json({ status: 1, message: "Tambah data berhasil!" })
        })
        .catch(err => { return res.status(400).json({ status: 0, message: err }) });
})

router.route('/:to').get((req, res) => {
    const pageSize = 5;
    const page = req.query.page || 1;
    let query = {}
    query.skip = pageSize * (page - 1)
    query.limit = pageSize;
    userReview.countDocuments({to:req.params.to}, (err, rows) =>{
        userReview.find({ to: req.params.to }, {}, query).populate({ path: 'project', populate: { path: "onProgress.proposalID", model:"projectProposal"}}).populate('from','-auth')
        .sort({ dateSubmitted: -1 })
        .then(data => {
            return res.status(200).json({ status: 1, total: rows, page: req.query.page, pagesize: pageSize, data: data })
        })
        .catch(err => res.status(400).json({ status: 0, message: err }))
    });

});

module.exports = router;