import io from 'socket.io-client'
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from '../store/actions/friendActions'
import store from '../store/store'
import { updateDirectChetHistoryIfActive } from '../shared/utils/chet'
import * as roomHandler from './roomHandler'
import * as webRTCHandler from './webRTCHandler'

let socket = null

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token

  socket = io('http://localhost:5002', {
    auth: {
      token: jwtToken,
    },
  })

  socket.on('connect', () => {
    console.log('Succesfully connected with socket.io server')
    console.log(socket.id)
  })

  socket.on('friends-invitation', (data) => {
    const { pendingInvitation } = data

    store.dispatch(setPendingFriendsInvitations(pendingInvitation))
  })

  socket.on('friends-list', (data) => {
    const { friends } = data
    store.dispatch(setFriends(friends))
  })
  socket.on('online-users', (data) => {
    const { onlineUsers } = data
    store.dispatch(setOnlineUsers(onlineUsers))
  })
  socket.on('direct-chet-history', (data) => {
    updateDirectChetHistoryIfActive(data)
  })
  socket.on('room-create', (data) => {
    roomHandler.newRoomCreated(data)
  })
  socket.on('active-rooms', (data) => {
    roomHandler.updateActiveRooms(data)
  })
  socket.on('conn-prepare', (data) => {
    const { connUserSocketId } = data
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false)

    socket.emit('conn-init', { connUserSocketId: connUserSocketId })
  })
  socket.on('conn-init', (data) => {
    const { connUserSocketId } = data
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true)
  })
  socket.on('conn-signal', (data) => {
    webRTCHandler.handlerSignalingData(data)
  })
  socket.on('room-participant-left', (data)=>{
    console.log('user left room')
    webRTCHandler.handleParticipantLeftRoom(data)
  })
}

export const sendDirectMessage = (data) => {
  console.log(data)
  socket.emit('direct-message', data)
}
export const getDirectChetHistory = (data) => {
  socket.emit('direct-chet-history', data)
}

export const createNewRoom = (data) => {
  socket.emit('room-create', data)
}
export const JoinRoom = (data) => {
  socket.emit('room-join', data)
}
export const leaveRoom = (data) => {
  socket.emit('room-leave', data)
}
export const signalPeerData = (data) => {
  socket.emit('conn-signal', data)
}
