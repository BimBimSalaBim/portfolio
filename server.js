// server.js
const express = require('express')
const next = require('next')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const dev = 'production' !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Error tracking (GlitchTip) for the custom server process
const Sentry = require('@sentry/nextjs')
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.05,
    environment: process.env.NODE_ENV,
  })
}

const port = process.env.PORT || 3000

app.prepare().then(() => {
  const server = express()

  // Enable CORS for all routes
  server.use(cors())

  // Parse JSON bodies (for POST /api/email)
  server.use(express.json())

  // Email sending API — POST /api/email
  // Body: { "to": "a@b.c" | ["a@b.c", ...], "subject": "...", "text"?: "...", "html"?: "...", "from"?: "x@y.z" }
  // Auth: header "x-api-key: <EMAIL_API_KEY>" (env var)
  // From: caller may pass "from" but only if it's in EMAIL_ALLOWED_FROM (comma-separated env); default EMAIL_FROM
  server.post('/api/email', async (req, res) => {
    try {
      const key = req.headers['x-api-key']
      if (!process.env.EMAIL_API_KEY || key !== process.env.EMAIL_API_KEY) {
        return res.status(401).json({ error: 'unauthorized' })
      }
      const { to, subject, text, html } = req.body || {}
      const from = (req.body && req.body.from) || process.env.EMAIL_FROM || 'admin@fzafar.com'
      if (!to || !subject || (!text && !html)) {
        return res.status(400).json({ error: 'to, subject, and text or html are required' })
      }
      const allowed = (process.env.EMAIL_ALLOWED_FROM || '').split(',').map((s) => s.trim()).filter(Boolean)
      if (allowed.length && !allowed.includes(from)) {
        return res.status(403).json({ error: 'from address not allowed', allowed })
      }
      const nodemailer = require('nodemailer')
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.zoho.com',
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
      const recipients = Array.isArray(to) ? to : to.split(',').map((s) => s.trim())
      await transporter.sendMail({
        from,
        to: recipients,
        subject,
        text,
        html,
      })
      res.json({ ok: true, from, to: recipients })
    } catch (err) {
      console.error('Email API error:', err)
      try {
        Sentry.captureException(err)
      } catch (_) { /* tracking must never break the API */ }
      res.status(500).json({ error: 'send failed' })
    }
  })

  // API endpoints
  server.get('/api/career', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'career.json')
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading career data:', err)
        res.status(500).send('Internal Server Error')
      } else {
        res.send(JSON.parse(data))
      }
    })
  })

  server.get('/api/skills', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'skills.json')
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading skills data:', err)
        res.status(500).send('Internal Server Error')
      } else {
        res.send(JSON.parse(data))
      }
    })
  })

  server.get('/api/projects', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'projects.json')
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading projects data:', err)
        res.status(500).send('Internal Server Error')
      } else {
        res.send(JSON.parse(data))
      }
    })
  })

  server.get('/api/funFacts', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'funFacts.json')
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading fun facts data:', err)
        res.status(500).send('Internal Server Error')
      } else {
        res.send(JSON.parse(data))
      }
    })
  })

  // Let Next.js handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
