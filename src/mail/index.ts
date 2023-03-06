'use strict';

import { Client } from '../types'

export async function sendMail(mailer: any, newClient: Client, token: string){
    const transporter = mailer.createTransport({
        host: String(process.env.MAIL_HOST),
        auth: {
            user: String(process.env.MAIL_USER),
            pass: String(process.env.MAIL_TOKEN)
        }
    });

    await transporter.sendMail({
        from: String(process.env.MAIL_SENDER),
        to: newClient.email,
        subject: 'Account validation',
        text: `For your account validation, please click next link below:
            ${process.env.ACCOUNT_VALIDATION_URL}${newClient.email}/${token}`
    });
}