import style from './style'

const App = (props) => (
  <div className={style('container')}>
    <div className={style('topBar')} />
    <div className={style('innerContainer')}>
      {props.children}
    </div>
  </div>
)

export default App
