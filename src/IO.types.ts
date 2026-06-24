import { SendEmail } from './sender'



export type SendEmailPayloadInputDTO = {
    subject: SendEmail['subject']
    text: SendEmail['text']
    replyTo: SendEmail['to']
    signature: string
}
