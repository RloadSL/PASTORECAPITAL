const nodemailer = require('nodemailer')
export function getTransport(type?: 'test') {
  switch (type) {
    case 'test':
      return nodemailer.createTransport({
        host: "smtp.rload.es",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: "jose@rload.es",
          pass: "Rload777"
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        }
      });
    default:
      return nodemailer.createTransport({
        host: "smtp.rload.es",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: "jose@rload.es",
          pass: "Rload777"
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        }
      });
  }
}

export function verifyTransporter() {
  getTransport('test').verify(function (error: any, success: any) {
    console.log('verifyTransporter', success)
  });
}


