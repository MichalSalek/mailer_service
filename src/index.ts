import { sendEmail, setApiKey }       from '@msalek/emails'
import cors                           from 'cors'
import * as dotenv                    from 'dotenv'
import express, { Request, Response } from 'express'
import helmet                         from 'helmet'




dotenv.config()



if (!process.env.PORT || !process.env.SENDGRID_API_KEY) {
    console.error('missing necessary env variables.')
    process.exit(1)
}


const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})



setApiKey(process.env.SENDGRID_API_KEY)



app.post('/send', async (req: Request, res: Response) => {

    const message = {...req.body, to: 'contact@michalsalek.com'}

    sendEmail(message, process.env.VERIFIED_SENDER)

    res.status(200).send('Wysłano.')
})
