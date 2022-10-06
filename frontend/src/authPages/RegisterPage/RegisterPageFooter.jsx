import React from 'react'
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton'
import RedirectInfo from '../../shared/components/RedirectInfo'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

const getFormNotValidMessage = () => {
  return 'User name should conatin between 6-12 characters and a valid email address'
}

const getFormValidMessage = () => {
  return 'Press to Register!'
}

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const navigate = useNavigate()
  const handlePushToLoginPage = () => {
    navigate('/login')
  }
  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: '30px' }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Already have an account? "
        redirectText="Login to your'e account"
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  )
}

export default RegisterPageFooter
