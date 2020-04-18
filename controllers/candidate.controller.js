const http = require('http')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const nodemailer = require('nodemailer')
const Candidate = require('../models/candidate.model')
require('dotenv').config()


exports.signup = async (req, res) => {
  // check if account exists
  let candidate = await Candidate.findOne({ email: req.body.email })
  if(candidate) {
    // 409 : Conflict
    return res.status(409).send({ msg: "User already exists with same email id."})
  }

  // create new user(candidate), hash the password
  candidate = new Candidate({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    gender: req.body.gender,
    age: req.body.age,
    location: req.body.location,
    skills: req.body.skills
  })

  // saving user in DB
  candidate.save( function (err){
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    else {
      sendVerifyMail(candidate._id, candidate.email)
      res.status(200).send({ msg: "Account created successfully." })
    }
  })

};

exports.signin = async (req, res) => {
  // check if account exists with this email
  let candidate = await Candidate.findOne({ email: req.body.email })
  if(!candidate) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }

  // check credentials
  if(!bcrypt.compareSync(req.body.password, candidate.password)) {
    // 403 : Forbidden
    return res.status(403).send({ msg: "Invalid Password." })
  }

  res.status(200).send(candidate);
};

exports.signout = function (req, res) {
  //TODO
};

exports.signoutall = function (req, res) {
  //TODO
};

exports.dashboard = function (req, res) {
    //TODO
};

exports.resetpassword = function (req, res) {
    //TODO
};

exports.verifyAccount = async (req, res) => {
  let candidate = await Candidate.findOne({ email: req.body.email })

  if(!candidate) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }
  
  if(candidate._id != req.params.id) {
    // 421 : Misdirected Request
    return res.status(421).send({ msg: "Wrong URL" })
  }

  if(bcrypt.compareSync(req.body.password, candidate.password)) {
    Candidate.findByIdAndUpdate(req.params.id, { isVerified: true }, (err, candidate) => {
      if(err) res.status(500).send({ msg: "Some error occured", err: err})
      res.send({ msg: "Account verified", user: candidate })
    })
  }
  else if(!bcrypt.compareSync(req.body.password, candidate.password)) {
    // 403 : Forbidden
    return res.status(403).send({ msg: "Invalid Password." })
  }
  
};

exports.updateprofile = function (req, res) {
    //TODO
};

exports.attempttest = function (req, res) {
    //TODO
};

exports.practicetest = function (req, res) {
    //TODO
};

function sendVerifyMail(toId, toEmail) {
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });

  let link = "localhost:3000/company/verify/" + toId;
  let mailOptions = {
    to : toEmail,
    subject : "testhub - Account Verification",
    html : "A account is registered with this email id on testhub. Click the following link to verify. " + link
  }

  smtpTransport.sendMail(mailOptions, function(err, msg){
    if(err) {
      console.log(err);
    }
    else {
      console.log("mail sent");
    }
  });
}