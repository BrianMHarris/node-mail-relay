var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');

app.post('/:name', function(request, response) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'brianharris.dev@gmail.com', // hide this in environ var
      pass: 'Portfol38Goo' // hide this in environ var
    }
  })

  var emailSubject = `Portfolio Contact from: ${request.body.fullName}`;
  var emailBody = `From: ${request.body.fullName}\n
                  Email: ${request.body.email}\n
                  Subject: ${request.body.subject}\n
                  Body: ${request.body.emailBody}`;

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
      response.json({msg: info.response});
    }
  });
})

app.listen(5000, function() {
  console.log("The server has started on port 5000");
})

app.get('/contact')
