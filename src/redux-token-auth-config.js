import { generateAuthActions } from 'redux-token-auth'
// import { authUrl } from './constants'

const config = {
  authUrl: '/api/v1/auth',
  userAttributes: {
    name: 'name',
    imageUrl: 'image',
  },
  userRegistrationAttributes: {
    name: 'name',
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
