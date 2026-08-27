# Email API (POST /api/email)

Shared email-sending endpoint hosted on this app (fzafar.com). Used by
myaudiobay, other apps, and agent crons to send mail through Zoho.

## Endpoint

```
POST https://fzafar.com/api/email
Headers:
  Content-Type: application/json
  x-api-key: <EMAIL_API_KEY>        # required
Body:
{
  "to": "user@example.com" | ["a@x.com", "b@x.com"],
  "subject": "Subject line",
  "text": "Plain text body",        # text or html required
  "html": "<p>Optional HTML body</p>",
  "from": "admin@fzafar.com"        # optional; must be in EMAIL_ALLOWED_FROM
}
```

## Responses

- `200 {"ok": true, "from": ..., "to": [...]}` — sent
- `400` — missing to/subject/text-or-html
- `401` — missing/wrong x-api-key
- `403` — `from` not in the allowed list
- `500` — SMTP failure (also reported to GlitchTip, project "Portfolio")

## Allowed senders (env EMAIL_ALLOWED_FROM)

- admin@fzafar.com (default when `from` omitted)
- admin@myaudiobay.com
- contact@myaudiobay.com
- contact@faizanzafar.net, mail@faizanzafar.net
- contact@zafarfaizan.com
- contact@fzafar.com, mail@fzafar.com

## Example

```bash
curl -X POST https://fzafar.com/api/email \
  -H "Content-Type: application/json" \
  -H "x-api-key: $EMAIL_API_KEY" \
  -d '{"from":"admin@myaudiobay.com","to":"user@example.com","subject":"Hello","text":"Body"}'
```

## Env vars

| var | purpose |
|---|---|
| EMAIL_API_KEY | required bearer key for the endpoint |
| EMAIL_ALLOWED_FROM | comma-separated allowed From addresses |
| EMAIL_FROM | default From when not passed |
| SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS | Zoho SMTP (smtp.zoho.com:465) |
| SENTRY_DSN / NEXT_PUBLIC_SENTRY_DSN | GlitchTip (bugs.fzafar.com, project "Portfolio") |

Note: SMTP_PASS is a Zoho app-specific password for the mailbox; rotate it in
Zoho Mail → Settings → App-Specific Passwords and update the env var (no code
change needed).
