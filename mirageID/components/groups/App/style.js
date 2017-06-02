import { StyleSheet, css } from 'aphrodite/no-important'

const stylesheet = StyleSheet.create({
  topBar: {
    width: '100%',
    height: '2.5em',
    backgroundColor: '#313631',
    '-webkit-app-region': 'drag'
  },
  container: {
    backgroundColor: '#4f514f',
    height: '100%',
    color: '#eff4ef'
  },
  innerContainer: {
    padding: '1em'
  }
})

const style = (name) => {
  const _style = stylesheet[name]
  return css(_style)
}

export default style
