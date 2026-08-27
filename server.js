// server.js
const express = require('express')
const next = require('next')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const dev = 'production' !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const port = process.env.PORT || 3000

app.prepare().then(() => {
  const server = express()

  // Enable CORS for all routes
  server.use(cors())

  // Parse JSON bodies (for POST /api/email)
  server.use(express.json())

  // Email sending API — POST /api/email
  // Body: { "to": "a@b.c" | ["a@b.c", ...], "subject": "...", "text"?: "...", "html"?: "..." }
  // Auth: header "x-api-key: <EMAIL_API_KEY>" (env var)
  server.post('/api/email', async (req, res) => {
    try {
      const key = req.headers['x-api-key']
      if (!process.env.EMAIL_API_KEY || key !== process.env.EMAIL_API_KEY) {
        return res.status(401).json({ error: 'unauthorized' })
      }
      const { to, subject, text, html } = req.body || {}
      if (!to || !subject || (!text && !html)) {
        return res.status(400).json({ error: 'to, subject, and text or html are required' })
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
        from: process.env.EMAIL_FROM || 'admin@fzafar.com',
        to: recipients,
        subject,
        text,
        html,
      })
      res.json({ ok: true, to: recipients })
    } catch (err) {
      console.error('Email API error:', err)
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
