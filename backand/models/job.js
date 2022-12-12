const mongoose = require('mongoose');
const {Schema} = mongoose;

const jobSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required:true,
    },
    salary:{
       type:Number,
       required:true,
    },

    // Full Time, Part Time, Work From Home
    jobType:{
        type:String,
        required:true,
    },

    skills:{
        type:String,
        required:true,
    },

    // 1 Month
    duration:{
        type:String,
        required:true,
    },

    //  Application Deadline
    deadline:{
        type:Date,
        required:true,
    },

    // Max No. Of Applicants
    applicants:{
        type:Number,
        required:true,
    },

    // Available Position
    position:{
        type:Number,
        required:true,
    }
})

const job = mongoose.model('job', jobSchema);
job.createIndexes();
module.exports = job;




