import { SendEmailPayloadInputDTO } from './IO.types'




export type SendEmailPayload =
    SendEmailPayloadInputDTO & {
    fromSite: string
}
