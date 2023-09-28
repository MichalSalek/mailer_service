import { Express, Request, Response }                                                        from 'express'
import { sendFeedbackToSender_COMMAND, sendMainMessage_COMMAND, triggerReportIssue_COMMAND } from './commands'
import { saveEmailToFile }                                                                   from './emailToFileSaver'
import { reportIssue }                                                                       from './errorHandler'
import { SendEmailPayload }                                                                  from './internal.types'
import { SendEmailPayloadInputDTO }                                                          from './IO.types'




export const routerHandlers = (app: Express): void => {
    app.post('/send', async (req: Request<SendEmailPayloadInputDTO>, res: Response): Promise<void> => {
        const {body} = req

        // Payload validation
        //
        if (!body?.subject || !body?.text) {
            const refusalReason = `Missing subject: ${typeof body?.subject} or text: ${body?.text}`
            console.warn(`
            mailer_service: Mail cannot be send. 
            ${{refusalReason}}`)
            res.status(400).send(refusalReason)
            return void undefined
        }

        const payload: SendEmailPayload = {
            ...body,
            fromSite: req.get('referer')
        }


        try {
            await sendMainMessage_COMMAND(payload)
            await sendFeedbackToSender_COMMAND(payload)
            res.status(200).send('OK')

        } catch (e) {
            reportIssue('mailer_service: /send route failed. Catch:')
            reportIssue(e)
            res.status(500).send('Something wrong.')
        }

        // Side effects
        //
        void saveEmailToFile(payload)
        void triggerReportIssue_COMMAND(payload)
    })


    if (process.env.ENABLE_DEPLOY_PASS_CHECK) {
        app.get('/', async (_, res: Response): Promise<void> => {
            res.status(200).send('OK')
        })
    }
}
