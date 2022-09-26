const FriendInvitation = require('../../models/friendInviration')
const User = require('../../models/user')
const friendsUpdates = require('../../socketHandlers/updates/friends')

const postAccept = async (req, res) => {
  try {
    const { id } = req.body

    const invitation = await FriendInvitation.findById(id)

    if (!invitation) {
      return res.status(401).send('error occured. Please try again')
    }

    const { senderId, reciverId } = invitation

    // Add friends to both users
    const senderUser = await User.findById(senderId)
    senderUser.friends = [...senderUser.friends, reciverId]

    const receiverUser = await User.findById(reciverId)
    receiverUser.friends = [...receiverUser.friends, senderId]

    await senderUser.save()
    await receiverUser.save()

    // Delete Invitation
    await FriendInvitation.findByIdAndDelete(id)

    // Update list of the friends if the users are online
    friendsUpdates.updateFriends(senderId.toString())
    friendsUpdates.updateFriends(reciverId.toString())

    // Update list of friends pending invitations
    friendsUpdates.updateFriendsPendingInvitation(reciverId.toString())

    return res.status(200).send('Friend Successfuly added')
  } catch (err) {
    console.log(err)
    return res.status(500).send('Somthing went wrong. Please try again')
  }
}

module.exports = postAccept
