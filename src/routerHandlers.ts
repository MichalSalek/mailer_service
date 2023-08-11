import { Express, Request, Response }                        from 'express'
import { handleSendFeedbackToSender, handleSendMainMessage } from './commands'
import { saveEmailToFile }                                   from './emailToFileSaver'
import { reportIssue }                                       from './errorHandler'
import { SendEmailPayload }                                  from './internal.types'
import { SendEmailPayloadInputDTO }                          from './IO.types'




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
