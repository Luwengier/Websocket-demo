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
  socket.emit('messageFromServer', { data: 'Welcome to the socketio server' })
  socket.on('messageToServer', (dataFromClient) => {
    console.log(dataFromClient)
  })
  socket.on('newMessageToServer', (msg) => {
    // console.log(msg)
    io.emit('messageToClients', { text: msg.text })
  })
})

httpServer.listen(9000, () => { console.log('Server listening on port 9000') })