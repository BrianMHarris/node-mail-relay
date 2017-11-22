require ('newrelic');
var express = require("express");
var app = express();
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
  res.redirect('/error');
});

app.get('/contact', function(req, res, next) {
  res.redirect('/error');
});

app.get('/error', function(req, res, next) {
  res.render('error');
});

app.post('/contact', function(req, res, next) {
  // eval(require("locus"))

  if (Object.keys(req.body).length === 0)
    res.send(JSON.stringify("Request Body was Empty"));

  var decrypted = CryptoJS.AES.decrypt(
    req.body.encrypted, process.env.SECRET_HANDSHAKE);
  var payload = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

  var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PW
    }
  })

  var emailSubject = `Portfolio Contact from: ${payload.fullName}`;

  // TODO: switch this to an HTML-based email with fancy styling
  //  and a reply button.
  var emailBody = `From: ${payload.fullName}\n
                  Email: ${payload.email}\n
                  Subject: ${payload.subject}\n
                  Body: ${payload.body}`;

  var mailOptions = {
    from: process.env.AUTH_USER,
    to: process.env.AUTH_USER,
    subject: emailSubject,
    text: emailBody
  }

  // TODO: better messaging [use .status(<status>).send(msg)]
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      res.json({fail: err});
    } else {
      console.log('Message sent: ' + info.response);
      res.json({success: info.response});
    }
  });
})

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("The server has started on port " + port);
});

// export the application for testing
module.exports = app;
