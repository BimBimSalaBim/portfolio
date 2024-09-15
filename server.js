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
