import { sendEmail, setApiKey }       from '@msalek/emails'
import cors                           from 'cors'
import * as dotenv                    from 'dotenv'
import express, { Request, Response } from 'express'
import helmet               from 'helmet'
import { SendEmailPayload } from './IO.types'




dotenv.config()



if (!process.env.PORT ||
    !process.env.SENDGRID_API_KEY ||
    !process.env.CORS_WHITELIST ||
    !process.env.VERIFIED_SENDER) {
    console.error('Missing necessary env variables.')
    process.exit(1)
}




const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()



const corsWhitelistArray: string[] = process.env.CORS_WHITELIST.split(',')

app.use(cors(
    {
        origin: corsWhitelistArray,
        'optionsSuccessStatus': 200
    }
))

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

    sendEmail(message, process.env.VERIFIED_SENDER as string)

    res.status(200).send('OK')
})

app.get('/', async (_, res: Response): Promise<void> => {
    res.status(200).send('ok');
})
