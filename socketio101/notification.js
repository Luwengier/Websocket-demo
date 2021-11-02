const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()

app.use(express.static(__dirname + '/public'))


const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
})

io.on('connection', (socket) => {
  socket.on('startNotify', (dataFromClient) => {
    console.log(dataFromClient)
  })

  socket.emit('getNotification', {
    title: 'The first notification',
    body: 'OK, lets going on.',
  })

  setInterval(() => {
    socket.emit('getNotification', {
      title: 'Show notification',
      body: 'I am notification content',
    })
  }, 10000)
})

httpServer.listen(9000, () => { console.log('Server listening on port 9000') })