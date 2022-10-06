import React from 'react'
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton'
import RedirectInfo from '../../shared/components/RedirectInfo'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

const getFormNotValidMessage = () => {
  return 'Enter a valid e-mail address and password should contain between 6-12 characters includes numbers, capital letters and small letters!'
}

const getFormValidMessage = () => {
  return 'Press to log in!'
}

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const navigate = useNavigate()
  const handlePushToRegisterPage = () => {
    navigate('/register')
  }
  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Log in"
            additionalStyles={{ marginTop: '30px' }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account? "
        redirectText="Create an account"
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  )
}

export default LoginPageFooter
