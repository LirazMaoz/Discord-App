import React from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { connect } from 'react-redux'
import { getActions } from '../../store/actions/alertActions'

const AlertNotifiction = ({
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      authHideDuration={6000}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
  )
}

const mapStoreStateToProps = ({ alert }) => {
  return {
    ...alert,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  }
}

export default connect(
  mapStoreStateToProps,
  mapActionsToProps,
)(AlertNotifiction)
