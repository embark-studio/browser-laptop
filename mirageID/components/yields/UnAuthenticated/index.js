import {Component} from 'react'
import {App} from '../../groups'
import {UserLogin, UserSignUp} from '../../templates'

class UnAuthenticated extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <App>
        {!this.state.signup ? (
          <UserLogin />
        ) : (
          <UserSignUp />
        )}
      </App>
    )
  }
}

export default UnAuthenticated
