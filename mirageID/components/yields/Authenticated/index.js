import {Component} from 'react'
import {App, ScrollContainer} from '../../groups'
import {connect} from 'react-redux'
import {identityActions} from '../../../actions'
import style from './style'

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
        <ScrollContainer>
          {this.props.identities.map((identity) => (
            <div className={style('identity')} onClick={this.handleIdentity.bind(null, identity)}>
              {identity.Name}
            </div>
          ))}
        </ScrollContainer>
      </App>
    )
  }
}

export default connect((state) => ({
  identities: state.identities
}))(UnAuthenticated)
