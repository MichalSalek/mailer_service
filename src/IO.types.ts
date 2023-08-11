import { SendEmail } from '@msalek/emails'



export type SendEmailPayloadInputDTO = {
    subject: SendEmail['subject']
    text: SendEmail['text']
    replyTo: SendEmail['to']
    signature: string
}
