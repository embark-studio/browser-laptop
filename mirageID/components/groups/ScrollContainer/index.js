import style from './style'

const ScrollContainer = (props) => (

  <div className={style('scrollOuterContainer')}>
    <div className={style('scrollContainer')}>
      {props.children}
    </div>
  </div>
)

export default ScrollContainer
