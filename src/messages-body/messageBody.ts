import { MessageBodyInput, MessageBodyOutput } from './messageBody.types'




export const getMainMessageBody = ({text, subject, fromSite, replyTo, signature = 'Anonim'}: MessageBodyInput): MessageBodyOutput => ({
    to: process.env.VERIFIED_SENDER as string,

    subject: `[${fromSite}]: ${subject}`,

    text: `${text}   signature: ${signature}   replyTo: ${replyTo}`,

    html: `
    <section style="padding: 16px; background-color: #fcfcfc">
        <h3>${subject}</h3>
        <p style="font-size: 22px">${text}</p>
        <p style="font-size: 16px">${signature}</p>
        
        <h5>Email sent from ${fromSite}</h5>
        <h5>Reply to: ${replyTo}</h5>
        <a href="mailto: ${replyTo}">mailto</a>
    </section>
    `
})



export const getFeedbackToSenderMessageBody = ({text, subject, replyTo, signature = 'Anonim'}: MessageBodyInput): MessageBodyOutput => {

    const nowDate: Date = new Date()

    return ({
        to: replyTo,

        subject: `Your message has been sent: ${subject}`,

        text: `
    Thank you for your message. We will reply to it as soon as possible.

    Below you will find the content of your message:
    
    
    
    ${text}
    
    MichalSalek.com
    Atomic Concept™ – ${nowDate.getUTCFullYear()}
    `,


        html: `
    <p>Thank you for your message. <strong>We will reply to it as soon as possible</strong>.</p>

    <p>Below you will find the content of your message:</p>
    
    <section style="padding: 16px; background-color: #fcfcfc">
        <h3>${subject}</h3>
        <p style="font-size: 22px">${text}</p>
        <p style="font-size: 16px">${signature}</p>
    </section>
    
    <h4>
        MichalSalek.com – <a href="https://michalsalek.com">https://michalsalek.com</a>
        <br/>
        Atomic Concept™ – ${nowDate.getUTCFullYear()}
    </h4>
    `
    })

}
