const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const jwtDecode = require('jwt-decode');
const projectProposal = require('../models/proposal.model');
const projectList = require('../models/project.model');
const { db } = require("../models/project.model");

// @route GET /api/projectList/{id}
// @desc GET SPECIFIC PROJECT WITH ID
// @access Public
router.route('/').get((req, res) => {

    projectProposal.find({}).populate('proposalBy projectID', '-auth').exec((err, data) => {
        if (err) return res.status(400).json({ status: 0, message: err });
        res.status(200).json({ status: 1, data: data });
    })

});

// @route GET /api/projectList/{id}
// @desc GET SPECIFIC PROJECT WITH ID
// @access Public
router.route('/').post((req, res) => {
    if (!req.cookies.token) {
        return res.status(400).json({ status: 0, message: 'Not Allowed' })
    }
    const reqData = req.body;
    const userID = (jwtDecode(req.cookies.token)).id;
    reqData.proposalBy = mongoose.Types.ObjectId(userID);
    const newProposal = new projectProposal(reqData);
    newProposal.save()
        .then(data => {
            projectProposal.up
        })
        .catch(err => { return res.status(400).json({ status: 0, message: err }) });

});

// @route GET /api/projectList/{id}
// @desc GET SPECIFIC PROJECT WITH ID
// @access Public
router.route('/').patch((req,res)=>{
    let userid = (jwtDecode(req.cookies.token)).id;

    projectProposal.findByIdAndUpdate(
        { _id: req.body.proposalID},
        { $set: req.body },
    )
    .then(data => res.status(200).json({status:1,message:"Update data sukses!"}))
    .catch(err => {return res.status(400).json({status:0,message:err})})

})

// @route GET /api/projectList/{id}
// @desc GET SPECIFIC PROJECT WITH ID
// @access Public
router.route('/').delete((req, res) => {
    let userid = (jwtDecode(req.cookies.token)).id;

    projectProposal.findById(req.query.proposalID)
    .then(data=>{
        let proposalBy = data.proposalBy.toString();
        if (proposalBy===userid){
            return projectProposal.findByIdAndDelete(req.query.proposalID)
            .then(data => res.status(200).json({status:1,message:'Data berhasil dihapus'}))
            .catch(err => res.status(400).json({message:err,status:0}))
        }else{
            return res.status(400).json({status:0,message:'Dissalowed'})
        }
    })
    .catch(err => res.status(400).json({status:0,message:"error"}))

})
// @route GET /api/projectList/{id}
// @desc GET SPECIFIC PROJECT WITH ID
// @access Public
router.route('/byCurrentUser').get((req, res) => {
    const userID = (jwtDecode(req.cookies.token)).id;

    projectProposal.find({ proposalBy: userID }).populate('proposalBy projectID', '-auth.password').exec((err, data) => {
        if (err) return res.status(400).json({ status: 0, message: err });
        res.status(200).json({ status: 1, data: data })
    })

});
// @route GET /api/proposal/{ProjectID}
// @desc GET SPECIFIC PROPOSAL WITH PROJECT ID
// @access Public
router.route('/getByID/:proposalID').get((req, res) => {
    projectProposal.findById(req.params.proposalID).populate('proposalBy projectID', '-auth')
        .then(data => {
            res.status(200).json({ status: 1, data: data });
        })
        .catch(err => { return res.status(400).json({ status: 0, message: err }) })

});

// @route GET /api/proposal/{ProjectID}
// @desc GET SPECIFIC PROPOSAL WITH PROJECT ID
// @access Public
router.route('/id/:projectID').get((req, res) => {
    projectProposal.find({ projectID : req.params.projectID}).populate('proposalBy projectID', '-auth')
    .then(data => {
        res.status(200).json({ status: 1, data: data });
    })
    .catch(err => {return res.status(400).json({status:0,message:err})})

});
module.exports = router;