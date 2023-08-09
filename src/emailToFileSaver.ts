import { getDateNowInString } from '@msalek/utils'
import fs                     from 'fs'
import path                   from 'path'
import { reportIssue }        from './errorHandler'
import { SendEmailPayload }   from './IO.types'




export const saveEmailToFile = ({subject, text, replyTo}: SendEmailPayload): void => {

    const content = `subject: ${subject}     text: ${text}     replyTo: ${replyTo}`

    fs.writeFile(
        path.resolve(__dirname, '../saved_emails/' + getDateNowInString({getISOFormat: false, withTimestamp: false}) + ' ' + subject + '.txt')
        ,
        content, (err) => {
            reportIssue(err)
        })

}
