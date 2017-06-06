import appActions from '../../js/actions/appActions'
import Immutable from 'immutable'

const actions = {
  launchIdentity: (identity) => {
    appActions.newWindow(null, Immutable.fromJS({identity}), null)
  }
}

export default actions
