const express = require('express');

const Application = require("../models/Applications");
const Job = require("../models/Job");
const User = require("../models/User");

const { body, validationResult } = require('express-validator');

const fetchuser = require('../middleware/fetchuser');
const { application } = require('express');

const router = express.Router();



router.post('/applyjob/:id', fetchuser, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try 
    {
        //console.log("Inside Try")
        
        let job = await Job.findById(req.params.id);
        if (!job) { return res.status(400).send("404 Job is Not Found") }
        
        let user = await User.findById(req.user.id);
        if (!user){ return res.status(400).send("404 User is Not Found") }

        //console.log(user.name);
        let application = await Application.create({
            userid: req.user.id,
            jobid: req.params.id,
            recruiterId: job.user,
            applicantName: user.name,
            title: job.title,
            description: job.description,
            salary: job.salary,
            jobType: job.jobType,
            skills: job.skills,
            status: 'Applied',
        })

        res.json(application);
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send("Internal server error");
    }
})

router.post('/fetchAppliedJobs', fetchuser, async (req, res) => {

    try {
        const application = await Application.find({ userid: req.user.id });
        res.json(application);

    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }

})


router.post('/fetchAllApplications', fetchuser, async(req, res)=>{

    try{
        const application = await Application.find({recruiterId: req.user.id});
        res.json(application);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }
})

router.post('/AcceptApplication/:id', fetchuser, async(req, res) => {

    try{
        const application = await Application.findByIdAndUpdate(req.params.id, {$set: {"status" : "Accepted"}});


        res.json(application);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }

})

router.post('/RejectApplication/:id', fetchuser, async(req, res) => {

    try{
        const application = await Application.findByIdAndUpdate(req.params.id, {$set: {"status" : "Rejected"}});


        res.json(application);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }

})

router.post('/FindStatus', fetchuser, async(req, res)=> {
    try{
        // const application = await Application.findOne({$and : [{'jobid' : req.params.id}, {'userid' : req.user.id}]})
        const applications = await Application.find({'userid' : req.user.id});

        // console.log(applications);
        // res.json({'status': application.status});
        // res.json(application);
        let obj = {}
        applications.map(application => {
            obj[application.jobid] = application.status;
        })

        res.json(obj);
    }
    catch (e) {
        res.json({'status' : ""})
        res.status(500).send("Internal server error");
    }
})

module.exports = router