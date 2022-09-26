const Conversation = require('../../models/conversation')
const serverStore = require('../../serverStore')

const updateChetHistory = async (
  conversationId,
  toSpecifiedSocketId = null,
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'author',
      model: 'User',
      select: 'username _id',
    },
  })
  if (conversation) {
    const io = serverStore.getSocketServerInstance()
    if (toSpecifiedSocketId) {
      // initial update of chet history
      return io.to(toSpecifiedSocketId).emit('direct-chet-history', {
        messages: conversation.messages,
        participants: conversation.participants,
      })
    }

    // check if users of this conversation are online
    //if yes, emit to them update of messages

    conversation.participants.forEach((userId) => {
      const activeConnections = serverStore.getActiveConnections(
        userId.toString(),
      )

      activeConnections.forEach((socketId) => {
        io.to(socketId).emit('direct-chet-history', {
          messages: conversation.messages,
          participants: conversation.participants,
        })
      })
    })
  }
}

module.exports = { updateChetHistory }
