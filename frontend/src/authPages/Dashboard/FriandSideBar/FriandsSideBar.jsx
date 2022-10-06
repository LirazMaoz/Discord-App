import React from 'react'
import { styled } from '@mui/system'
import AddFriandButton from './AddFriandButton'
import FriendTitle from './FriendTitle'
import FriendsList from './FriendsList/FriendsList'
import PendingInvitationList from './PendingInvitationList/PendingInvitationList'

const MainContainer = styled('div')({
  width: '224px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#2F3136',
})
const FriandsSideBar = () => {
  return (
    <MainContainer>
      <AddFriandButton />
      <FriendTitle title="Private Messages" />
      <FriendsList/>
       <FriendTitle title="Invitations" />
       <PendingInvitationList/>
    </MainContainer>
  )
}

export default FriandsSideBar
