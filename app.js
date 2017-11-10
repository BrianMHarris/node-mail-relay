var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var CryptoJS = require("crypto-js");
require('dotenv').config();

// middleware
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

// CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.AUTH_DOMAIN);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', function(req, res, next) {
  res.render('error');
});

app.get('/contact', function(req, res, next) {
  res.render('error');
});

app.post('/contact', function(req, res, next) {

  if (Object.keys(req.body).length === 0)
    res.send(JSON.stringify("Request Body was Empty"));

  var decrypted = CryptoJS.AES.decrypt(
    req.body.encrypted, process.env.SECRET_HANDSHAKE);
  var payload = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

  var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.AUTH_USER, // hide this in environ var
      pass: process.env.AUTH_PW // hide this in environ var
    }
  })

  var emailSubject = `Portfolio Contact from: ${payload.fullName}`;
  var emailBody = `From: ${payload.fullName}\n
                  Email: ${payload.email}\n
                  Subject: ${payload.subject}\n
                  Body: ${payload.body}`;

  var mailOptions = {
    from: 'brianharris.dev@gmail.com', // hide this in environ var
    to: 'brianharris.dev@gmail.com', // hide this in environ var
    subject: emailSubject,
    text: emailBody
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      res.json({msg: 'FAIL'});
    } else {
      console.log('Message sent: ' + info.response);
      res.json({msg: info.response});
    }
  });
})

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("The server has started on port " + port);
});

app.get('/contact')
