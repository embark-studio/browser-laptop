import { css } from 'aphrodite/no-important'
const stylesheet = {

}

const style = (name) => {
  const _style = stylesheet[name]
  return css(_style)
}

export default style
