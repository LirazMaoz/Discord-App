const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const socketServer = require('./socketServer')

const authRoutes = require('./routes/authRoutes')

const PORT = process.env.PORT || process.env.API_PORT

const app = express()
app.use(express.json())
app.use(cors())

//Register the routes
app.use('/api/auth', authRoutes)

console.log('Server Is Restarting')
const server = http.createServer(app)
socketServer.registerSocketServer(server)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log('Database Conaction Failed. Server Has Not Started!')
    console.error(err)
  })
