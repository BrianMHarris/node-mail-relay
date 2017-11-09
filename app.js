var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
require('dotenv').config();

// middleware
app.set("view engine", "pug");
app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({extended:true}));
// parse application/json
app.use(bodyParser.json())

// CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post('/contact', function(req, res, next) {
  // eval(require("locus"))
  if (Object.keys(req.body).length === 0)
    res.send(JSON.stringify("Request Body was Empty"));

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.AUTH_USER, // hide this in environ var
      pass: process.env.AUTH_PW // hide this in environ var
    }
  })

  var emailSubject = `Portfolio Contact from: ${req.body.fullName}`;
  var emailBody = `From: ${req.body.fullName}\n
                  Email: ${req.body.email}\n
                  Subject: ${req.body.subject}\n
                  Body: ${req.body.body}`;

  var mailOptions = {
    from: 'brianharris.dev@gmail.com', // hide this in environ var
    to: 'brianharris.dev@gmail.com', // hide this in environ var
    subject: emailSubject,
    text: emailBody
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if (error) {
      console.log(error);
      res.json({msg: 'error while sending email'});
    } else {
      console.log('Message sent: ' + info.response);
      res.json({msg: info.response});
    }
  });
})

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

app.listen(5000, function() {
  console.log("The server has started on port 5000");
})

app.get('/contact')
