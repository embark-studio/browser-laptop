import {Component} from 'react'
import {App} from '../../groups'
import {connect} from 'react-redux'
import {identityActions} from '../../../actions'

class UnAuthenticated extends Component {
  constructor () {
    super()
    this.state = {}
    this.handleIdentity = this.handleIdentity.bind(this)
  }
  handleIdentity (identity) {
    identityActions.launchIdentity(identity)
  }
  render () {
    return (
      <App>
        Identities
        {this.props.identities.map((identity) => (
          <div onClick={this.handleIdentity.bind(null, identity)}>
            {identity.Name}
          </div>
        ))}
      </App>
    )
  }
}

export default connect((state) => ({
  identities: state.identities
}))(UnAuthenticated)
