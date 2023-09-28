import * as dotenv from 'dotenv'
import Rollbar     from 'rollbar'




dotenv.config()

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production'
}


const isRollbarApiKeyExists = Boolean(process.env.ROLLBAR_API_KEY)
console.info(`mailer_service: Is Rollbar API key passed? ${isRollbarApiKeyExists}`)

const rollbar = isRollbarApiKeyExists ? new Rollbar({
    accessToken:                process.env.ROLLBAR_API_KEY,
    captureUncaught:            true,
    captureUnhandledRejections: true,
    environment:                process.env.NODE_ENV
}) : undefined

const isRollbarAlive = Boolean(rollbar)
console.info(`mailer_service: Is Rollbar alive? ${isRollbarAlive}`)

export const reportIssue = (msg: any, type: 'log' | 'warn' | 'error' | 'info' = 'error'): void => {
    console[type](msg)
    if (isRollbarAlive) {
        (rollbar as Rollbar)[type](msg)
    }
}
