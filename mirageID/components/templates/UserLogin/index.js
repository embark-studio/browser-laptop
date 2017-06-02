import {Component} from 'react'
import {
  Button
} from '../../elements'
import {InputField} from '../../groups'
import {userActions} from '../../../actions'
import {connect} from 'react-redux'

class UserLogin extends Component {
  constructor () {
    super()
    this.params = {}
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  onChange (key, e) {
    e.preventDefault()
    this.params[key] = e.target.value
  }
  handleSubmit (e) {
    e.preventDefault()
    userActions.login(this.params)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <InputField
          label='Username'
          field='TextField'
          onChange={this.onChange.bind(null, 'username')}
          placeholder='johndoe'
        />
        <InputField
          label='Password'
          field='PasswordField'
          onChange={this.onChange.bind(null, 'password')}
          placeholder=''
        />
        <Button>Login</Button>
      </form>
    )
  }
}

export default connect((state) => ({
  user: state.user
}))(UserLogin)
