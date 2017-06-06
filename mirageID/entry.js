import Routes from './routes'
import appReducer from './store'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

window.store = createStore(appReducer)
const style = {height: '100%'}
if (window.localStorage.getItem('user')) {
  window.store.dispatch({
    type: 'SET_USER',
    value: JSON.parse(window.localStore.getItem('user'))
  })
}
const Main = (props) => (
  <div style={style}>
    <Provider store={window.store}>
      <Routes appState={props.appState} />
    </Provider>
  </div>
)

document.body.style.height = '100%'

export default Main
