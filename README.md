# Mailer service

Mailer microservice in node.js - layer for sending emails with TypeScript interface

#### Routes

`/send` with payload from `IO.types` file - send email.
`/` available only with `ENABLE_DEPLOY_PASS_CHECK` env var.

#### Do not forget

To copy `.env.example` file to `.env` and configure it.

Sandbox CORS setting: `CORS_WHITELIST=*`

#### Error tracker testing:

Send email with `REPORT_ISSUE_SECRET_SUBJECT` subject saved env vars.
Both values must be equal.
