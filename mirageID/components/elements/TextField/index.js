import Input from '../Input'

const TextField = (props) => (
  <Input
    type='text'
    onChange={props.onChange}
    placeholder={props.placeholder}
    className={props.className}
  />
)

export default TextField
