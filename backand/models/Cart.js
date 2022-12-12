const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    jobid:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'job'
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
})

const cart = mongoose.model('cart', cartSchema);
cart.createIndexes();
module.exports = cart;




