import { SendEmail } from '@msalek/emails'




type FeedbackToSenderMessageBody = {
    text: SendEmail['text']
    subject: SendEmail['subject']
}

type FeedbackToSenderMessageBodyOutput = {
    text: SendEmail['text']
    subject: SendEmail['subject']
    html: SendEmail['html']
}

export const getFeedbackToSenderMessageBody = ({text, subject}: FeedbackToSenderMessageBody): FeedbackToSenderMessageBodyOutput => ({
    subject: `Your message has been sent: ${subject}`,

    text: `
    Thank you for your message. We will reply to it as soon as possible.

    Below you will find the content of your message:
    
    
    
    ${text}
    `,


    html: `
    <p>Thank you for your message. <strong>We will reply to it as soon as possible</strong>.</p>

    <p>Below you will find the content of your message:</p>
    
    
    <h6>${subject}</h6>
    <pre>${text}</pre>
    `
})
