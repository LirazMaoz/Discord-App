const { v4: uuidv4 } = require('uuid')

const connectedUsers = new Map()
let activeRooms = []

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

// rooms
const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: uuidv4(),
  }
  activeRooms = [...activeRooms, newActiveRoom]

  console.log('new active rooms')
  console.log(activeRooms)
  return newActiveRoom
}

const getActiveRooms = () => {
  return [...activeRooms]
}

const getActiveRoom = (roomId) => {
  const activeRoom = activeRooms.find(
    (activeRoom) => activeRoom.roomId === roomId,
  )
  if (activeRoom) {
    return {
      ...activeRoom,
    }
  } else {
    return null
  }
}

const joinActiveRoom = (roomId, newParticipants) => {
  const room = activeRooms.find((room) => room.roomId === roomId)
  activeRooms = activeRooms.filter((room) => room.roomId !== roomId)

  const updatedRoom = {
    ...room,
    participants: [...room.participants, newParticipants],
  }
  activeRooms.push(updatedRoom)
}

const leaveActiveRoom = (roomId, participantSocketId) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId)

  if (activeRoom) {
    const copyOfActiveRoom = { ...activeRoom }

    copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
      (participant) => participant.socketId !== participantSocketId,
    )

    activeRooms = activeRooms.filter((room) => room.roomId !== roomId)

    if (copyOfActiveRoom.participants.length > 0) {
      activeRooms.push(copyOfActiveRoom)
    }
  }
}

module.exports = {
  addConnectedUsers,
  removeConnectedUsers,
  getActiveConnections,
  setSocketServerInstance,
  getSocketServerInstance,
  getOnlineUsers,
  addNewActiveRoom,
  getActiveRooms,
  getActiveRoom,
  joinActiveRoom,
  leaveActiveRoom,
}
