'use server';
import nodemailer, {Transporter} from 'nodemailer';
import SMTPPool from "nodemailer/lib/smtp-pool";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import SendmailTransport from "nodemailer/lib/sendmail-transport";
import JSONTransport from "nodemailer/lib/json-transport";
const SMTP_SERVER_HOST = process.env.SMTP_HOST;
const SMTP_SERVER_PORT = process.env.SMTP_PORT;
const SMTP_SERVER_USERNAME = process.env.SMTP_USER;
const SMTP_SERVER_PASSWORD = process.env.SMTP_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.ROOT_EMAIL;

type test =  SMTPPool.Options

const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: SMTP_SERVER_HOST,
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD,
    },
    ignoreTLS: false,
    secure: true,
    port: 587,

});

export async function sendMail({
                                   email,
                                   sendTo,
                                   subject,
                                   text,
                                   html,
                               }: {
    email: string;
    sendTo?: string;
    subject: string;
    text: string;
    html?: string;
}) {
    try {
        const isVerified = await transporter.verify();
    } catch (error) {
        console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error);
        return;
    }
    const info = await transporter.sendMail({
        from: email,
        to: sendTo || SITE_MAIL_RECIEVER,
        subject: subject,
        text: text,
        html: html ? html : '',
    });
    console.log('Message Sent', info.messageId);
    console.log('Mail sent to', SITE_MAIL_RECIEVER);
    return info;
}