const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendInvitationSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reciverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model(
  'FriendInvitationSchema',
  friendInvitationSchema,
)
