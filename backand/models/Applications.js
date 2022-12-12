const mongoose = require('mongoose');
const {Schema} = mongoose;

const ApplicationSchema = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    jobid:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'job'
    },
    recruiterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'job'
    },

    applicantName:{
        type:String,
        required:true
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

    status:{
        type:String,
    }
})

const application = mongoose.model('application', ApplicationSchema);
application.createIndexes();
module.exports = application;