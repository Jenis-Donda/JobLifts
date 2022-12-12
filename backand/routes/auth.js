const express = require('express');
const LocalStorage = require('node-localStorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
const User = require("../models/User");

var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Darshitisagoodboy';

const router = express.Router();

const token = "";

// Create a new user
router.post('/createuser', [
    body('name', 'Name Must have atleast 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('confirm_password', 'Both Passowrd Must be same').isLength({ min: 5 })

], async (req, res) => {

    // If there are errors return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0]['msg'] });
    }

    try {
        // check whether the user with this email already exist

        if (req.body.password != req.body.confirm_password) {
            return res.status(400).json({ error: "Both Password Must be same" });
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            dob: req.body.dob,
            about: req.body.about,
            type: req.body.type

        })

        const data = {
            user: {
                id: user.id,
            }
        }

        console.log(data);
        const authtaken = jwt.sign(data, JWT_SECRET);
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: "Please enter a unique email id", message:err.message})});
        //    res.json(user);
        localStorage.setItem('token', authtaken);
        localStorage.setItem('userType', req.body.type);
        res.json({ 'success': authtaken, 'userType': req.body.type, 'email': req.body.email });
        // res.json({autotaken});
    }
    catch (err) {
        console.error(err.message);
        // res.status(500).send("Some error occured");
        res.status(400).json({ error: "Internal server error" });
    }


})

// User Login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a password it can not be blank').exists(),
], async (req, res) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    // Using Destructuring method of javascript
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Please Enter Correct login Credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ error: "Please Enter Correct login Credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        //res.json({authToken});
        localStorage.setItem('token', authToken);
        localStorage.setItem('userType', user.type);
        req.body.authtoken = authToken;
        req.body.userType = user.type;
        res.json({ 'success': req.body.authtoken, 'userType': user.type, 'email': user.email });
    }
    catch (error) {
        console.error(error.message);
        res.status(400).json({ error: "Internal server error" });
    }
})

module.exports = router
// module.exports = token