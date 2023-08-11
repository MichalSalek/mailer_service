import { setApiKey }        from '@msalek/emails'
import cors                 from 'cors'
import * as dotenv          from 'dotenv'
import express, { Express } from 'express'
import helmet               from 'helmet'
import { reportIssue }      from './errorHandler'
import { routerHandlers }   from './routerHandlers'



dotenv.config()

if (!process.env.PORT ||
    !process.env.SENDGRID_API_KEY ||
    !process.env.CORS_WHITELIST ||
    !process.env.VERIFIED_SENDER) {
    reportIssue('Missing necessary env variables.')
    process.exit(1)
}

const app: Express = express()

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


routerHandlers(app)
