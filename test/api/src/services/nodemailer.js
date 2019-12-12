const nodemailer = require( 'nodemailer' );
const keys = require( '../config/keys' );

const sendEmail = async ( email, message ) => {
  let transporter = nodemailer.createTransport({
    host: keys.TRANSPORT_HOST,
    port: keys.TRANSPORT_PORT,
  });

  let info = await transporter.sendMail({
    from: 'Express With Authentication <info@app.com>',
    to: email,
    subject: 'Reset Password',
    text: message,
  });

  console.log( 'Message sent: %s', info.messageId );
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log( 'Preview URL: %s', nodemailer.getTestMessageUrl( info ) );
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendEmail;
