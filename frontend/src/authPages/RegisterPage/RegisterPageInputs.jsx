import React from 'react'
import InputWithLabel from '../../shared/components/InputWithLabel'

const RegisterPageInputs = (props) => {
  const { mail, setMail, username, setUsername, password, setPassword } = props

  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-mail address"
        type="email"
        placeholder="Enter your'e email address"
      />
      <InputWithLabel
        value={username}
        setValue={setUsername}
        label="User Name"
        type="text"
        placeholder="What is your user name?"
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter your'e password"
      />
    </>
  )
}

export default RegisterPageInputs
