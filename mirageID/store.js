import { combineReducers } from 'redux'
import identities from './reducers/identities'
import user from './reducers/user'

const app = combineReducers({
  user,
  identities
})

export default app
