import React, { useState } from 'react'
import { styled } from '@mui/system'
import { connect } from 'react-redux'
import { sendDirectMessage } from '../../../realtimeCommunication/socketConnection'

const Maincontainer = styled('div')({
  height: '60px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Input = styled('input')({
  backgroundColor: '#2f3136',
  width: '98%',
  height: '44px',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  padding: '0 10px',
})

const NewMessageInput = ({ chosenChatDetails }) => {
  const [message, setMessage] = useState('')

  const handlerMessageValueChange = (event) => {
    setMessage(event.target.value)
  }

  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        reciverUserId: chosenChatDetails.id,
        content: message,
      })
      setMessage('')
    }
  }

  return (
    <Maincontainer>
      <Input
        placeholder={`Writh a message to ${chosenChatDetails.name}`}
        value={message}
        onChange={handlerMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
    </Maincontainer>
  )
}

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  }
}
export default connect(mapStoreStateToProps)(NewMessageInput)
