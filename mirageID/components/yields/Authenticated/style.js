import { css, StyleSheet } from 'aphrodite/no-important'
const stylesheet = StyleSheet.create({
  identity: {
    padding: '.9em 1em',
    cursor: 'pointer',
    margin: '.5em 0px',
    backgroundColor: '#2c2f2c',
    borderRadius: '3px'
  }
})
const style = (name) => {
  const _style = stylesheet[name]
  return css(_style)
}

export default style
