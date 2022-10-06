import React, { useEffect } from 'react'
import { styled } from '@mui/system'
import Messages from './messages/Messages'
import NewMessageInput from './NewMessageInput'
import { getDirectChetHistory } from '../../../realtimeCommunication/socketConnection'

const Wrapper = styled('div')({
  flexGrow: 1,
})

const MessangerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    getDirectChetHistory({
      reciverUserId: chosenChatDetails.id,
    })
  }, [chosenChatDetails])

  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  )
}

export default MessangerContent
