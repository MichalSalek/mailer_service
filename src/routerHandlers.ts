import { sendEmail }                                          from '@msalek/emails'
import { Express, Request, Response }                         from 'express'
import { saveEmailToFile }                                    from './emailToFileSaver'
import { reportIssue }                                        from './errorHandler'
import { SendEmailPayloadInputDTO }                           from './IO.types'
import { getFeedbackToSenderMessageBody, getMainMessageBody } from './messages-body/messageBody'




export type SendEmailPayload =
    SendEmailPayloadInputDTO & {
    fromSite: string
}

const handleSendMainMessage = async (payload: SendEmailPayload): Promise<void> => {
    try {
        return await sendEmail(
            getMainMessageBody(payload),
            process.env.VERIFIED_SENDER as string)
    } catch (e) {
        reportIssue('handleSendMainMessage FAILED: ' +
            JSON.stringify(e))
    }
}


const handleSendFeedbackToSender = async (payload: SendEmailPayload): Promise<void> => {
    try {
        return await sendEmail(
            getFeedbackToSenderMessageBody(payload),
            process.env.VERIFIED_SENDER as string)
    } catch (e) {
        reportIssue('handleSendFeedbackToSender FAILED: ' +
            JSON.stringify(e))
    }
}


export const routerHandlers = (app: Express): void => {


    app.post('/send', async (req: Request<SendEmailPayloadInputDTO>, res: Response): Promise<void> => {
        const {body} = req

        if (!body?.subject || !body?.text) {
            const errorText = `Mail cannot be send. Missing subject: ${typeof body?.subject} or text: ${body?.text}}`
            console.warn(errorText)
            res.status(400).send(errorText)
            return void undefined
        }

        const payload: SendEmailPayload = {
            ...body,
            fromSite: req.get('referer')
        }

        void saveEmailToFile(payload)

        try {

            await handleSendMainMessage(payload)

            await handleSendFeedbackToSender(payload)

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
