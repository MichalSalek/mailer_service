const Rollbar = require('rollbar')

const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_API_KEY,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: process.env
})

export const reportIssue = (msg: any, type: 'log' | 'warn' | 'error' = 'error'): void => {

    console[type](msg)

    if (process.env.NODE_ENV === 'production') {
        rollbar[type](msg)
    }
}
