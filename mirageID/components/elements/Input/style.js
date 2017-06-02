import { StyleSheet, css } from 'aphrodite/no-important'

const stylesheet = StyleSheet.create({
  passwordField: {
    padding: '.5em 1em',
    fontSize: '1.01em',
    borderRadius: '5px',
    width: '100%',
    border: '1px solid #c5d2d1',
    boxSizing: 'border-box'
  }
})

const style = (name) => {
  const _style = stylesheet[name]
  return css(_style)
}

export default style
