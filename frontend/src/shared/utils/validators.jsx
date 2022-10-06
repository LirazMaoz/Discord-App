export const validateLoginForm = ({ mail, password }) => {
  const isMailValid = validateMail(mail)
  const isPasswordValid = validatePassword(password)

  return isMailValid && isPasswordValid
}

export const validateRegisterForm = ({ mail, password, username }) => {
  return (
    validateMail(mail) && validatePassword(password) && UsernameValid(username)
  )
}

const validatePassword = (password) => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  return passwordPattern.test(password)
}

export const validateMail = (mail) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailPattern.test(mail)
}

const UsernameValid = (username) => {
  return username.length > 1 && username.length < 13
}
