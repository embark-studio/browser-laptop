import Input from '../Input'

const PasswordField = (props) => (
  <Input
    type='password'
    onChange={props.onChange}
    placeholder={props.placeholder}
    className={props.className}
  />
)

export default PasswordField
