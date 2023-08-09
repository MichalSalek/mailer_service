import { getDateNowInString } from '@msalek/utils'
import fs                     from 'fs'
import path                   from 'path'
import { reportIssue }        from './errorHandler'
import { SendEmailPayload }   from './IO.types'




export const saveEmailToFile = ({subject, text, replyTo}: SendEmailPayload): void => {

    const dir = '../saved_emails/'

    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    } catch (err) {
        console.error(err);
    }

    const content = `subject: ${subject}     text: ${text}     replyTo: ${replyTo}`

    fs.writeFile(
        path.resolve(__dirname, dir + getDateNowInString({getISOFormat: false, withTimestamp: false}) + ' ' + subject + '.txt')
        ,
        content, (err) => {
            reportIssue(err)
        })

}
