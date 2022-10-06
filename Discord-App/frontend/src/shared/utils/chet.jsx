import store from '../../store/store'
import { setMessages } from '../../store/actions/chatActions'

export const updateDirectChetHistoryIfActive = (data) => {
  const { participants, messages } = data

  // find id of user from token and id from active conversation
  const receiverId = store.getState().chat.chosenChatDetails?.id
  const userId = store.getState().auth.userDetails._id

  if (receiverId && userId) {
    const userInConversation = [receiverId, userId]

    updateChetHistoryIfSameConversationActive({
      participants,
      userInConversation,
      messages,
    })
  }
}

const updateChetHistoryIfSameConversationActive = ({
  participants,
  userInConversation,
  messages,
}) => {
  const result = participants.every(function (participantId) {
    return userInConversation.includes(participantId)
  })
  if (result) {
    store.dispatch(setMessages(messages))
  }
}
