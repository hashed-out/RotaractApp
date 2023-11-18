const nodemailer = require('nodemailer');

const sendRecoveryCode = async (email)=>{
    const generateCode = ()=> {
        const min = 100000; // Minimum value for a 6-digit number
        const max = 999999; // Maximum value for a 6-digit number
        console.log("generating code")
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
        const transporter = nodemailer.createTransport({
            // service: 'Gmail', // Use your email service here (e.g., Gmail, Outlook, etc.)
            host: 'smtp.freesmtpservers.com',
            port: 25,
            secure: false,
            // auth: {
            //   user: 'hashedout.tech@gmail.com', // Your email address
            //   pass: 'Hashed@2023' // Your email password or app-specific password
            // }
            auth: {
                type: 'none' // Indicate no authentication
              }
          });

  console.log(transporter)
    try{
        console.log("sending email now");
        const recoveryCode =await generateCode();
        console.log(recoveryCode)
        const mailOptions = {
            // from: 'hashedout.tech@gmail.com',
            to: email,
            subject: 'Password Recovery Code',
            text: `Your password recovery code is: ${recoveryCode}`
          };
    
          transporter.sendMail(mailOptions, (error, info) => {
            console.log(info);
            console.log(error)
            if (error) {
              console.error(error);
              return 'Error occurred while sending email';
            } else {
              console.log('Email sent: ' + info.response);
              return 'Recovery code sent to your email';
            }
          });
    }catch(error){
        console.log(error)
    }
}

module.exports=sendRecoveryCode;

  