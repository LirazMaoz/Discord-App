const User = require('../../models/user')
const FriendInvitation = require('../../models/friendInviration')
const serverStore = require('../../serverStore')

const updateFriendsPendingInvitation = async (userId) => {
  try {
    const pendingInvitation = await FriendInvitation.find({
      reciverId: userId,
    }).populate('senderId', '_id username mail')

    // Find all activ connection of specified userId
    const receiverList = serverStore.getActiveConnections(userId)

    const io = serverStore.getSocketServerInstance()

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-invitation', {
        pendingInvitation: pendingInvitation ? pendingInvitation : [],
      })
    })
  } catch (err) {
    console.log(err)
  }
}

const updateFriends = async (userId) => {
  try {
    // Find active connections of a specific id (online users)
    const receiverList = serverStore.getActiveConnections(userId)
    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        'friends',
        '_id username mail',
      )

      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            mail: f.mail,
            username: f.username,
          }
        })

        // Get io server instance
        const io = serverStore.getSocketServerInstance()

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit('friends-list', {
            friends: friendsList ? friendsList : [],
          })
        })
      }
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  updateFriendsPendingInvitation,
  updateFriends,
}
