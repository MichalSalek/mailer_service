import { getDateNowInString } from '@msalek/utils'
import fs                     from 'fs'
import { resolve }            from 'path'
import { reportIssue }        from './errorHandler'
import { SendEmailPayload }   from './internal.types'




export const saveEmailToFile = ({subject, text, replyTo, signature, fromSite}: SendEmailPayload): void => {
    try {
        const emailsDir = resolve(__dirname, '../saved_emails', encodeURIComponent(fromSite))

        if (!fs.existsSync(emailsDir)) {
            fs.mkdirSync(emailsDir, {recursive: true})
        }

        const content = `subject: ${subject}     text: ${text}     signature: ${signature}     replyTo: ${replyTo}`

        fs.writeFile(
            resolve(emailsDir, getDateNowInString({getISOFormat: false, withTimestamp: false}) + ' [' + subject + '].txt')
            ,
            content, (err) => {
                reportIssue(err)
            })

    } catch (err) {
        console.error(err)
    }
}
