import {Component} from 'react'
import {TextField, PasswordField} from '../../elements'

class UserLogin extends Component {
  onChange (e) {
    console.log(e.target.value)
  }
  render () {
    return (
      <div>
        <TextField onChange={this.onChange} />
        <PasswordField onChange={this.onChange} />
      </div>
    )
  }
}

export default UserLogin
