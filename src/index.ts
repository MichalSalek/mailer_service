import { sendEmail, setApiKey }       from '@msalek/emails'
import cors                           from 'cors'
import * as dotenv                    from 'dotenv'
import express, { Request, Response } from 'express'
import helmet                         from 'helmet'
import { reportIssue }                from './errorHandler'
import { SendEmailPayload }           from './IO.types'




if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production'
}


dotenv.config()

if (!process.env.PORT ||
    !process.env.SENDGRID_API_KEY ||
    !process.env.CORS_WHITELIST ||
    !process.env.VERIFIED_SENDER) {
    reportIssue('Missing necessary env variables.')
    process.exit(1)
}

const app = express()

const PORT: number = parseInt(process.env.PORT as string, 10)

const corsWhitelistArray: string[] = process.env.CORS_WHITELIST.split(',')
const isWildcardAllowOrigin = corsWhitelistArray[0] === '*'
const corsOptions = {
    origin: isWildcardAllowOrigin ? '*' : corsWhitelistArray,
    'optionsSuccessStatus': 200
}


app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})



setApiKey(process.env.SENDGRID_API_KEY)


app.post('/send', async ({body}: Request<SendEmailPayload>, res: Response): Promise<void> => {

    if (!body?.subject || !body?.text) {
        const errorText = `Mail cannot be send. Missing subject: ${typeof body?.subject} or text: ${body?.text}}`
        console.warn(errorText)
        res.status(400).send(errorText)
        return void undefined
    }

    const message = {...body, to: process.env.VERIFIED_SENDER}

    try {
        sendEmail(message, process.env.VERIFIED_SENDER as string)
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
