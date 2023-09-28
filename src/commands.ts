import { sendEmail }                                          from '@msalek/emails'
import { reportIssue }                                        from './errorHandler'
import { SendEmailPayload }                                   from './internal.types'
import { getFeedbackToSenderMessageBody, getMainMessageBody } from './messages-body/messageBody'




export const handleSendMainMessage = async (payload: SendEmailPayload): Promise<void> => {
    try {
        return await sendEmail(
            getMainMessageBody(payload),
            process.env.VERIFIED_SENDER as string)

    } catch (e) {
        reportIssue('mailer_service: handleSendMainMessage failed.')
        reportIssue(e)
    }
}


export const handleSendFeedbackToSender = async (payload: SendEmailPayload): Promise<void> => {
    try {
        return await sendEmail(
            getFeedbackToSenderMessageBody(payload),
            process.env.VERIFIED_SENDER as string)

    } catch (e) {
        reportIssue('mailer_service: handleSendFeedbackToSender failed.')
        reportIssue(e)
    }
}



export const handleReportIssue = async (payload: SendEmailPayload): Promise<void> => {
    if (payload.subject === process.env.REPORT_ISSUE_SECRET_SUBJECT) {
        reportIssue('mailer_service: handleSendFeedbackToSender failed.')
        reportIssue(payload)
    }
}


