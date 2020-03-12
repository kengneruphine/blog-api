const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require('../validation')

exports.registerUser = async function (req, res) {
    //validating the data received before creating a new user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in the database
    const usernameExist = await User.findOne({ username: req.body.username });
    if (usernameExist) return res.status(400).send('Username already exists');

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create  a new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ savedUser }); //returning only the user id
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.loginUser = async function (req, res) {
    //validating the data received before creating a new user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the username exists
    const user = await User.findOne({ username: req.body.username }); //getting the user already stored in the database
    if (!user) return res.status(400).send('Email is not found');

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    //create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);  //adding our token to the header when a user login

}