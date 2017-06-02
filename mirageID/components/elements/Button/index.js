import Input from '../Input'
import style from './style'

const Button = (props) => (
  <Input
    type='submit'
    onChange={props.onChange}
    placeholder={props.placeholder}
    className={`${props.className} ${style('button')}`}
  />
)

export default Button
