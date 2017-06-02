import { StyleSheet, css } from 'aphrodite/no-important'

const stylesheet = StyleSheet.create({
  container: {
    padding: '.5em 0px'
  },
  label: {
    fontSize: '1.1em',
    fontWeight: '600'
  }
})

const style = (name) => {
  const _style = stylesheet[name]
  return css(_style)
}

export default style
