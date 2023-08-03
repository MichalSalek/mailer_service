import Rollbar from 'rollbar'


const isRollbarActive = Boolean(process.env.ROLLBAR_API_KEY)
console.log(`Is Rollbar active? ${isRollbarActive}`)

const rollbar = isRollbarActive ? new Rollbar({
    accessToken: process.env.ROLLBAR_API_KEY,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: process.env.NODE_ENV
}) : undefined

export const reportIssue = (msg: any, type: 'log' | 'warn' | 'error' = 'error'): void => {

    console[type](msg)

    if (process.env.NODE_ENV === 'production' && isRollbarActive) {
        (rollbar as Rollbar)[type](msg)
    }
}
