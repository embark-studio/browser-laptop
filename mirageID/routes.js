import {Component} from 'react'
import {UnAuthenticated, Authenticated} from './components/yields'
import {connect} from 'react-redux'

class Routes extends Component {
  render () {
    return this.props.user.ID ? (
      <Authenticated />
    ) : (
      <UnAuthenticated />
    )
  }
}
export default connect((state) => ({
  user: state.user
}))(Routes)
