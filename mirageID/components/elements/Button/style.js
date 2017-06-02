import { StyleSheet, css } from 'aphrodite/no-important'

const stylesheet = StyleSheet.create({
  button: {
    fontSize: '1.01em',
    fontWeight: '600',
    color: '#eff2ef',
    backgroundColor: '#353835',
    border: '1px solid #242924'
  }
})

const style = (name) => {
  const _style = stylesheet[name]
  return css(_style)
}

export default style
