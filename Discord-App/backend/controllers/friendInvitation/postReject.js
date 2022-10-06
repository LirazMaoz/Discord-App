const FriendInvitation = require('../../models/friendInviration')
const friendsUpdates = require('../../socketHandlers/updates/friends')

const postReject = async (req, res) => {
  try {
    const { id } = req.body
    const { userId } = req.user

    // Remove that invitation from the friend invitations collection

    const invitationExists = await FriendInvitation.exists({
      _id: id,
    })
    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id)
    }

    // Update pending invitations
    friendsUpdates.updateFriendsPendingInvitation(userId)

    return res.status(200).send('Invitation succesfully rejected')
  } catch (err) {
    console.log(err)
    return res.status(500).send('Somthing went wrong. Please try again')
  }
}

module.exports = postReject
