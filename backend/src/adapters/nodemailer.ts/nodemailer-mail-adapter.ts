import nodemailer from 'nodemailer'

import { MailAdapter, SendMailData } from "../mail-adapter";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e89f161da44917",
      pass: "ffdd5706888562"
    }
  });


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail ({body, subject}: SendMailData){

    await transport.sendMail({from: 'Matheus <teste@gmail.com>', to: 'Matheus Correia <matheuscorreiags@gmail.com>', subject, html: body})
    }
}