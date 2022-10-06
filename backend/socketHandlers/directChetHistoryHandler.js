const Conversation = require('../models/conversation')
const chetUpdates = require('./updates/chet')

const directChetHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user
    const { reciverUserId } = data

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, reciverUserId] },
      type: 'DIRECT',
    })

    if (conversation) {
      chetUpdates.updateChetHistory(conversation._id.toString(), socket.id)
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = directChetHistoryHandler
