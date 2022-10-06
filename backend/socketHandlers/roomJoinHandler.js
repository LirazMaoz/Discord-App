const serverStore = require('../serverStore')
const roomsUpdates = require('./updates/rooms')

const roomJoineHandler = (socket, data) => {
  const { roomId } = data

  const participantsDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  }

  const roomDetails = serverStore.getActiveRoom(roomId)

  serverStore.joinActiveRoom(roomId, participantsDetails)

  // Send ingormation to users in room that they should prepare for incoming connection

  roomDetails.participants.forEach((participants) => {
    if(participants.socketId !== participantsDetails.socketId){
      socket.to(participants.socketId).emit('conn-prepare',{
        connUserSocketId: participantsDetails.socketId
      })
    }
  })

  roomsUpdates.updateRooms()
}

module.exports = roomJoineHandler
