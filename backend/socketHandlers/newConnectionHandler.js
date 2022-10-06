const serverStore = require('../serverStore')
const friendsUpdate = require('../socketHandlers/updates/friends')
const roomsUpdate = require('./updates/rooms')

const newConnectionHndler = async (socket, io) => {
  const userDetails = socket.user

  serverStore.addConnectedUsers({
    socketId: socket.id,
    userId: userDetails.userId,
  })

  // update pendingFriendsInvitationsList
  friendsUpdate.updateFriendsPendingInvitation(userDetails.userId)

  // Update friends list
  friendsUpdate.updateFriends(userDetails.userId)

  setTimeout(() => {
    roomsUpdate.updateRooms(socket.id)
  }, [500])
}

module.exports = newConnectionHndler
