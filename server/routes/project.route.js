const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const jwtDecode = require('jwt-decode');

//Models
const projectList = require('../models/project.model');
const projectProposal = require('../models/proposal.model');
const { db } = require("../models/project.model");





// @route GET /api/projectList/
// @desc GET ALL PROJECTLISST
// @access Public
router.route('/').get((req, res) => {
    const lat = req.query.lat || undefined;
    const lng = req.query.lng||undefined;
    const searchText = req.query.search||'';
    searchText.toLowerCase();
    const pageSize = 5;
    const page = req.query.page || null;
    let query = {}
    query.skip = pageSize * (page - 1)
    query.limit = pageSize;
    projectList.countDocuments({}, (err, rows) => {
        if (err) return res.status(400).json({ status: 0, message: err })
        if (page === null) {
            return projectList.find({}).populate('postedBy', '-auth -address').exec((err, docs) => {
                if (err) return res.status(400).json({ status: 0, message: err });
                res.status(200).json({ status: 1, rows: rows, data: docs });
            })
        }
        if ((lat !== '0' && lat !== undefined) && (lng !== '0' && lng !== undefined)){
            return projectList.
                find(
                    {
                        "location.geoLocation.coordinates": {
                            "$near": {
                                "$maxDistance": 50000,
                                "$geometry": {
                                    "type": "Point",
                                    "coordinates": [parseFloat(lng), parseFloat(lat)]
                                }
                            }
                        } 
                    },
                    {},
                    query
                )
                .or([
                    { projectName: { $regex: new RegExp(searchText) } },
                    { projectDescription: { $regex: new RegExp(searchText) } },
                ])
                .sort({ _id: -1 })
                .populate('postedBy', '-auth -address')
                .exec((err, data) => {
                    if (err) return res.status(400).json({ status: 0, message: err });
                    res.status(200).json({ status: 1, rows: rows, page: page, pageSize: pageSize, data: data });
                })
        }
        projectList.
            find({}, {}, query)
            .or([
                { projectName: { $regex: new RegExp(searchText) } },
                { projectDescription: { $regex: new RegExp(searchText) } },
            ])
            .sort({ _id: -1 })
            .populate('postedBy', '-auth -address')
            .exec((err, data) => {
                if (err) return res.status(400).json({ status: 0, message: err });
                res.status(200).json({ status: 1, rows: rows, page: page, pageSize: pageSize, data: data });
            })

    });
});

// @route POST /api/projectList/
// @desc ADD NEW PROJECT
// @access with http-only token
router.route('/').post((req, res) => {
    const projectData = req.body;
    const userID = (jwtDecode(req.cookies.token)).id;

    const lat = projectData.location.geoLocation[0];
    const lng = projectData.location.geoLocation[1];

    projectData.postedBy = mongoose.Types.ObjectId(userID);
    projectData.location.geoLocation = {
        type: "Point",
        coordinates: [lng, lat]
    };

    const newProjectList = new projectList(projectData);
    newProjectList.save()
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err));



});

// @route POST /api/projectList/
// @desc ADD NEW PROJECT
// @access with http-only token
router.route('/').patch((req,res) => {
    
    projectList.findByIdAndUpdate(
        req.body._id,
        {$set: req.body},
    )
    .then(data =>{
        res.status(200).json({status:1,data:data})
    })
    .catch(err => res.status(400).json({status:0,message:err}))
    

})

// @route GET /api/projectList/{id}
// @desc GET SPECIFIC PROJECT WITH ID
// @access Public
router.route('/byCurrentUser').get((req, res) => {
    if (!req.cookies.token) {
        return res.status(400).json({ status: 0, message: 'Not Allowed' })
    }

    const userID = (jwtDecode(req.cookies.token)).id;
    projectList.find({ postedBy: userID }).populate("onProgress.proposalID").exec((err, data) => {
        if (err) return res.status(400).json({ status: 0, message: err });
        res.status(200).json(data);
    })

});

// @route GET /api/projectList/{id}
// @desc GET SPECIFIC PROJECT WITH ID
// @access Public
router.route('/:id').get((req, res) => {

    projectList.findById(req.params.id).populate('postedBy', '-auth').exec((err, data) => {
        if (err) res.status(400).json({ status: 0, message: err });
        if (!data) res.status(400).json({ status: 0, message: 'Data tidak ditemukan' })
        res.status(200).json(data);
    })

});


module.exports = router;
