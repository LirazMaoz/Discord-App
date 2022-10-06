const Message = require('../models/message')
const Conversation = require('../models/conversation')
const chetUpdates = require('./updates/chet')

const directMessageHandler = async (socket, data) => {
  try {
    console.log('direct msg event is being handled')

    const { userId } = socket.user
    const { reciverUserId, content } = data

    // Create new Message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: 'DIRECT',
    })

    // Find if conversation exist with this two users - if not create new
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, reciverUserId] },
    })
    if (conversation) {
      conversation.messages.push(message._id)
      await conversation.save()

      // perform and update to sender and receiver if online
      chetUpdates.updateChetHistory(conversation._id.toString())
    } else {
      // create new conversation if not exist
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, reciverUserId],
      })
      // perform and update to sender and receiver if online
      chetUpdates.updateChetHistory(newConversation._id.toString())
    }
  } catch (err) {
    console.log(err)
  }
}
module.exports = directMessageHandler
