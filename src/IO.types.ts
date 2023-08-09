import { SendEmail } from '@msalek/emails'



export type SendEmailPayload = {
    subject: SendEmail['subject']
    text: SendEmail['text']
    replyTo: SendEmail['to']
}
