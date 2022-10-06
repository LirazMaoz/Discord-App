const User = require('../../models/user')
const FriendInvitation = require('../../models/friendInviration')
const friendsUpdate = require('../../socketHandlers/updates/friends')

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body

  const { userId, mail } = req.user

  // Check if the send invite is not sending to self user

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res.status(409).send("Sorry, you can't send self invatation")
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  })

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetMailAddress} has not been found. Please re-cheack the e-mail address`,
      )
  }

  // Check if invitation has sent already

  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    reciverId: targetUser._id,
  })

  if (invitationAlreadyReceived) {
    res.status(409).send('Invitation has already been sent')
  }

  // Check if user is already our friend

  const userAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString(),
  )

  if (userAlreadyFriends) {
    return res
      .status(409)
      .send("Friend already added. Please check you'r friends list")
  }

  // Create new invitation in the database

  // Send pending invitations update to a specific user
  friendsUpdate.updateFriendsPendingInvitation(targetUser._id.toString())

  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    reciverId: targetUser._id,
  })

  return res.status(201).send('Invitation has been sent')
}

module.exports = postInvite
