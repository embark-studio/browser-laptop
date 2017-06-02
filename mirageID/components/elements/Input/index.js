import style from './style'

const Input = (props) => (
  <input
    type={props.type}
    onChange={props.onChange}
    className={`${style('passwordField')} ${props.className}`}
    placeholder={props.placeholder}
  />
)

export default Input
