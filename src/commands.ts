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
        reportIssue('handleSendMainMessage FAILED: ' +
            JSON.stringify(e))
    }
}


export const handleSendFeedbackToSender = async (payload: SendEmailPayload): Promise<void> => {
    try {
        return await sendEmail(
            getFeedbackToSenderMessageBody(payload),
            process.env.VERIFIED_SENDER as string)
    } catch (e) {
        reportIssue('handleSendFeedbackToSender FAILED: ' +
            JSON.stringify(e))
    }
}
