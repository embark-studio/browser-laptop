import { StyleSheet, css } from 'aphrodite/no-important'

const stylesheet = StyleSheet.create({
  scrollOuterContainer: {
    position: 'relative',
    height: '100%'
  },
  scrollContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'absolute',
    top: '1em',
    bottom: '0px',
    left: '0px',
    right: '0px',
    backgroundColor: '#3c3f3c',
    padding: '1em',
    borderRadius: '5px',
    boxSizing: 'border-box'
  }
})

const style = (name) => {
  const _style = stylesheet[name]
  return css(_style)
}

export default style
