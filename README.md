# node-mail-relay


## Overview
A simple node.js / express server for relaying email from a client to an email address. Configuration is set in environment variables and passed to a nodemailer transport.

For example, I use this to intercept encrypted form data from a client contact page. After decrypting the data, and building the transport, the data is sent to my gmail account.

## Install
Simply fork or directly clone into your own directory.
Then in the terminal run `npm install` for dependencies.

## Usage
Incoming data must be formatted correctly.

### Code Examples (Client)
The following code samples show what the client-side code might look like (client not included).

The data we want to include in the email:

```
let payload = {
  fullName: <user name>,
  email: <user's email>,
  subject: <user's subject>,
  body: <user's message>
}
```

I then encrypt the payload using [Crypto-JS](https://github.com/brix/crypto-js). Expanded for readability:

```
let payloadJSON = JSON.stringify(payload);
let encrypted = CryptoJS.AES.encrypt(
  payloadJSON, process.env.SECRET_HANDSHAKE);
encrypted = encrypted.toString();
```

Next, the client sends a fetch request to the server:

```
fetch(process.env.SERVER_ADDRESS, {
  method: 'POST',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    encrypted
  })
})...(handle then, catch, etc)
```
### Environment Variables
All environment variables should be placed in a .env file at the root of the project.

CLIENT (not included!)

```
SERVER_ADDRESS:
SECRET_HANDSHAKE:
```
PS - you can name them whatever you want as long as they match the code.

SERVER

```
AUTH_DOMAIN: A domain you authorize to send you data
EMAIL_SERVICE: Email service nodemailer will connect to
AUTH_USER: Email account to receive emails at EMAIL_SERVICE
AUTH_PW: Password for your email account at EMAIL_SERVICE
SECRET_HANDSHAKE: A secret password sent from the client. Must match!
```
For more information on how to configure the nodemailer options, see [https://nodemailer.com/about/](https://nodemailer.com/about/).
## Modules Used
* [node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [nodemailer](https://nodemailer.com/about/)
* [crypto-js](https://github.com/brix/crypto-js)
* [bodyparser](https://github.com/expressjs/body-parser)
* [dotenv](https://www.npmjs.com/package/dotenv)

## License

node-mail-relay is licensed under the MIT license
