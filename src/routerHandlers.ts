import { SendEmail, sendEmail }        from '@msalek/emails'
import { Express, Request, Response }  from 'express'
import { saveEmailToFile }             from './emailToFileSaver'
import { reportIssue }                    from './errorHandler'
import { getFeedbackToSenderMessageBody } from './feedbackToSenderMessageBody'
import { SendEmailPayload }               from './IO.types'




const handleSendFeedbackToSender = async ({text, subject, replyTo}: SendEmailPayload, VERIFIED_SENDER: string): Promise<void> => {
    try {
        return await sendEmail(
            {...getFeedbackToSenderMessageBody({text, subject}), to: replyTo},
            VERIFIED_SENDER)
    } catch (e) {
        reportIssue('handleSendFeedbackToSender FAILED: ' +
            JSON.stringify(e))
    }

}


export const routerHandlers = (app: Express): void => {



    app.post('/send', async ({body}: Request<SendEmailPayload>, res: Response): Promise<void> => {

        if (!body?.subject || !body?.text) {
            const errorText = `Mail cannot be send. Missing subject: ${typeof body?.subject} or text: ${body?.text}}`
            console.warn(errorText)
            res.status(400).send(errorText)
            return void undefined
        }

        const message: SendEmailPayload & { to: SendEmail['to'] } = {...body, to: process.env.VERIFIED_SENDER}

        saveEmailToFile(message)

        try {
            await sendEmail(message,
                process.env.VERIFIED_SENDER as string)

            await handleSendFeedbackToSender(message, process.env.VERIFIED_SENDER as string)

            res.status(200).send('OK')
        } catch (e) {
            reportIssue(e)
            res.status(500).send('Something wrong, check logs.')
        }
    })




    if (process.env.ENABLE_SERVER_CONFIG_DEBUG) {
        app.get('/', async (_, res: Response): Promise<void> => {
            res.status(200).send('OK')
        })
    }

}
