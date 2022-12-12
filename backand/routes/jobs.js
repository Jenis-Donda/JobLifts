const express = require('express');

const LocalStorage = require('node-localStorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

const Job = require("../models/Job");
const ApiFeatures = require("../utils/apifeatures");

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Darshitisagoodboy';

const router = express.Router();




// Create a new Job

router.post('/createjob', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('position', 'Position must be greater than 0').isInt({ gt: 0 }),
    body('salary', 'Salary must be greater than 1000 Rs.').isInt({ gt: 1000 }),
    // body('date', 'Enter a valid date').isISO8601().toDate()


], async (req, res) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        let job = await Job.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            jobType: req.body.jobType,
            skills: req.body.skills,
            duration: req.body.duration,
            deadline: req.body.deadline,
            applicants: req.body.applicants,
            position: req.body.position

        })

        res.json(job);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send("Internal server error");
    }

})

// Fetch all Jobs
router.post('/fetchjobs', fetchuser, async (req, res) => {

    try {
        const jobs = await Job.find({ user: req.user.id });
        res.json(jobs);

    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }

})

// Update Job

router.post('/updatejob/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, jobType, duration, deadline, position, salary } = req.body;

        const newJob = {};

        if (title) { newJob.title = title };
        if (description) { newJob.description = description };
        if (jobType) { newJob.jobType = jobType };
        if (duration) { newJob.duration = duration };
        if (deadline) { newJob.deadline = deadline };
        if (position) { newJob.position = position };
        if (salary) { newJob.salary = salary };

        let fetchJob = await Job.findById(req.params.id);
        if (!fetchJob) { return res.status(400).send("404 Job is Not Found") }

        if (fetchJob.user.toString() != req.user.id) {
            res.status(401).send("Not Allowed");
        }

        fetchJob = await Job.findByIdAndUpdate(req.params.id, { $set: newJob }, { new: true });
        res.json(fetchJob);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
    
})

// Delete Jobs

router.delete('/deletejob/:id', fetchuser , async(req, res)=>{
    try{

        let job = await Job.findById(req.params.id);

        if(!job){
            return res.status(404).send("Not Found");
        }

        if(job.user.toString() != req.user.id)
        {
            return res.status(401).send("Not allowed");
        }

        job = await Job.findByIdAndDelete(req.params.id);
        res.json({"Success": "Job has been Deleted Successfully", job: job});

    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Fetch All the Jobs To display to users

router.post('/fetchalljobs', async(req, res)=>{
    try {
        const jobs = await Job.find();
        res.json(jobs);

    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }
})

router.post('/search', async(req, res)=>{

    const apifeature = new ApiFeatures(Job.find(), req.query).search().filter();

    try {
        //const jobs = await Job.find();
        const jobs = await apifeature.query;

        console.log(jobs);
        res.json(jobs);

    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }

})
module.exports = router