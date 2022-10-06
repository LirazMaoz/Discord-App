const serverStore = require('../serverStore')
const roomsUpdate = require('./updates/rooms')

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data

  const activeRoom = serverStore.getActiveRoom(roomId)

  if (activeRoom) {
    serverStore.leaveActiveRoom(roomId, socket.id)

    const updateActiveRoom = serverStore.getActiveRoom(roomId)

    if (updateActiveRoom) {
      updateActiveRoom.participants.forEach((participant) => {
        socket.to(participant.socketId).emit('room-participant-left', {
          connUserSocketId: socket.id,
        })
      })
    }

    roomsUpdate.updateRooms()
  }
}

module.exports = roomLeaveHandler
