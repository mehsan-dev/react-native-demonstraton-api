# React Native Project Backend Server

### Starting the Project

` npm install`

`npm start`

### Dependencies

- Node JS version >= 18.13.0
- Setup MongoDB on you local machine or on MongoDB ATLAS and copy the connection uri of database in `.env` file
- Create an account on `Mailtrap`
  - Goto email testing
  - Under inboxes -> SMTP settings -> Integrations select `nodemailer`
  - Copy the test SMTP server credentials and paste into `.env` file
- Create a JWT secret in `.env` file

- Copy and paste your firebase app credentials in
  - `src/config/firebaseConfig.js`
- Start your backend server and paste server IP and Port in
  - `src/constants`

### Implemented Features

- AUTH
  - Login & Sigup using JWT authentication token with validations
  - Forgot/reset password functionality
  - A code will be sent through email in Mailtrap inbox for reseting the password which expires after 1 hour
- Calculator routes
