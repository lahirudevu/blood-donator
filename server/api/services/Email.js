import express from 'express';
import nodemailer from 'nodemailer';
import config from '../../config';

/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: config.Email,
        pass: config.EmailPassword
    }
});

export default {
    send : (to, subject, text) => {
        logger.debug('inside email send function');

        let mailOptions = {
            to: to,
            subject: subject,
            text: text
        }

        // return Promise.resolve('success occurred when sending email');

        return new Promise((resolve, reject) => {
            smtpTransport.sendMail(mailOptions, (error, response) => {
                if (error) {
                    logger.error(error);
                    reject('error occurred when sending email');
                } else {
                    logger.debug("Message Successfully sent: " + response.message);
                    resolve(response);
                }
            });
        });
    },
};
