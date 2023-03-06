import 'dotenv/config';
import { Client } from './src/types';
import { sendMail } from './src/mail';
const mailer = require('nodemailer');
import { AMQPClient, AMQPQueue, AMQPChannel, AMQPConsumer } from '@cloudamqp/amqp-client'


(async function run() {
    try {
        const client: AMQPClient = new AMQPClient(String(process.env.AMQP_URL))
        const connection = await client.connect();
        const channel: AMQPChannel = await connection.channel();
        const accountsQueue: AMQPQueue = await channel.queue(String(process.env.ACCOUNTS_QUEUE_NAME));

        const consumer: AMQPConsumer = await accountsQueue.subscribe({ noAck: true }, async (msg) => {
            const body: any = JSON.parse(String(msg.bodyToString()));
            const client: Client = body.client;
            const token: string = body.token;
            
            await sendMail(mailer, client, token);
            console.log('Email sent to ' + client.email);
            // await consumer.cancel();
        });

        await consumer.wait();
        // await connection.close();
        
    } catch (e) {
        console.error("ERROR", e);
        process.exit(1);
    }
})()