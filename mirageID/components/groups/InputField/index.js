import style from './style'
import {inputs} from '../../elements'

const InputField = (props) => {
  const Input = inputs[props.field]

  return (
    <div className={style('container')}>
      <label className={style('label')}>{props.label}</label>
      <Input onChange={props.onChange} placeholder={props.placeholder} />
    </div>
  )
}

export default InputField
