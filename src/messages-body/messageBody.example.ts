import { MessageBodyInput, MessageBodyOutput } from './messageBody.types'




export const getMainMessageBody = ({text, subject, fromSite, replyTo, signature}: MessageBodyInput): MessageBodyOutput => ({
    to: process.env.VERIFIED_SENDER as string,

    subject: `Email subject`,

    text: `Email plain text`,

    html: `
    <section style="padding: 16px; background-color: #fcfcfc">
        <p>Email body with HTML</p>
    </section>
    `
})



export const getFeedbackToSenderMessageBody = ({text, subject, replyTo, signature}: MessageBodyInput): MessageBodyOutput => ({
    to: replyTo,

    subject: `Email subject`,

    text: `Email plain text`,

    html: `
    <section style="padding: 16px; background-color: #fcfcfc">
        <p>Email body with HTML</p>
    </section>
    `
})
