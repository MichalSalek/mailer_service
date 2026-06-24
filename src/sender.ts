import { Resend } from 'resend'




export type SendEmail = {
    to: string // recipient
    subject: string // email topic
    text: string // email body
    html?: string  // email body with HTML
}

let resend: Resend | null = null

export const setApiKey = (API_KEY: string): void => {
    resend = new Resend(API_KEY)
    console.info('@mailer_service: Resend client initialised.')
}

export const sendEmail = async (payload: SendEmail, VERIFIED_SENDER: string): Promise<void> => {

    if (!resend) {
        throw new Error('mailer_service: Resend client not initialised. Call setApiKey first.')
    }

    const createActionID = Math.round(Math.random() * 100000)

    console.info('mailer_service: sendEmail BEGIN... ID of action: ', createActionID)
    console.info(`from: ${VERIFIED_SENDER}, to: ${payload.to}, subject: ${payload.subject}`)

    const { data, error } = await resend.emails.send({
        from:    VERIFIED_SENDER,
        to:      payload.to,
        subject: payload.subject,
        text:    payload.text,
        ...(payload.html ? { html: payload.html } : {})
    })

    if (error) {
        console.error('mailer_service: Resend send error:')
        console.error(error)
        throw error
    }

    console.info('mailer_service: Email sent. Resend id: ', data?.id)
    console.info('mailer_service: sendEmail END. ID of action: ', createActionID)
}
