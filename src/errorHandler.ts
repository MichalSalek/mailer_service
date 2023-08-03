import * as dotenv from 'dotenv'
import Rollbar     from 'rollbar'




dotenv.config()

const isRollbarApiKeyExists = Boolean(process.env.ROLLBAR_API_KEY)
console.log(`Is Rollbar API key passed? ${isRollbarApiKeyExists}`)

const rollbar = isRollbarApiKeyExists ? new Rollbar({
    accessToken: process.env.ROLLBAR_API_KEY,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: process.env.NODE_ENV
}) : undefined

const isRollbarAlive = Boolean(rollbar)
console.log(`Is Rollbar alive? ${isRollbarAlive}`)

export const reportIssue = (msg: any, type: 'log' | 'warn' | 'error' = 'error'): void => {

    console[type](msg)

    if (process.env.NODE_ENV === 'production' && isRollbarApiKeyExists) {
        (rollbar as Rollbar)[type](msg)
    }
}
