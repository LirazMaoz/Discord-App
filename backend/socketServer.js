const authSocket = require('./middleware/authSocket')
const newConnectionHndler = require('./socketHandlers/newConnectionHandler')
const disconnectHandler = require('./socketHandlers/disconnectHandler')
const serverStore = require('./serverStore')
const { emit } = require('./models/user')
const directMessageHandler = require('./socketHandlers/directMessageHandler')
const directChetHistoryHandler = require('./socketHandlers/directChetHistoryHandler')
const roomCreateHandler = require('./socketHandlers/roomCreateHandler')
const roomJoineHandler = require('./socketHandlers/roomJoinHandler')
const roomLeaveHandler = require('./socketHandlers/roomLeaveHandler')
const roomInitializeConnectionHandler = require('./socketHandlers/roomInitializeConnectionHandler')
const roomSignalingDataHandler = require('./socketHandlers/roomSignalingDataHandler')

const registerSocketServer = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['get', 'post'],
    },
  })

  serverStore.setSocketServerInstance(io)

  io.use((socket, next) => {
    authSocket(socket, next)
  })

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers()
    io.emit('online-users', { onlineUsers })
  }
  io.on('connection', (socket) => {
    console.log('user connected')
    console.log(socket.id)

    newConnectionHndler(socket, io)
    emitOnlineUsers()

    socket.on('direct-message', (data) => {
      directMessageHandler(socket, data)
    })

    socket.on('ditrct-chet-history', (data) => {
      directChetHistoryHandler(socket, data)
    })

    socket.on('room-create', () => {
      roomCreateHandler(socket)
    })
    socket.on('room-join', (data) => {
      roomJoineHandler(socket, data)
    })
    socket.on('room-leave', (data) => {
      roomLeaveHandler(socket, data)
    })
    socket.on('conn-init', (data) => {
      roomInitializeConnectionHandler(socket, data)
    })

    socket.on('conn-signal', (data) => {
      roomSignalingDataHandler(socket, data)
    })
    socket.on('disconnect', () => {
      disconnectHandler(socket)
    })
  })
  setInterval(() => {
    emitOnlineUsers()
  }, [1000 * 8])
}

module.exports = {
  registerSocketServer,
}
