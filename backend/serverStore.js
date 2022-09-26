const connectedUsers = new Map()

let io = null

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance
}
const getSocketServerInstance = () => {
  return io
}

const addConnectedUsers = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId })
  console.log('new connected user')
  console.log(connectedUsers)
}
const removeConnectedUsers = ({ socketId }) => {
  connectedUsers.has(socketId)
  connectedUsers.delete(socketId)
  console.log('new connected user')
  console.log(connectedUsers)
}

const getActiveConnections = (userId) => {
  const activConnections = []

  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) {
      activConnections.push(key)
    }
  })
  return activConnections
}

const getOnlineUsers = () => {
  const onlineUsers = []

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId })
  })
  return onlineUsers
}

module.exports = {
  addConnectedUsers,
  removeConnectedUsers,
  getActiveConnections,
  setSocketServerInstance,
  getSocketServerInstance,
  getOnlineUsers,
}
