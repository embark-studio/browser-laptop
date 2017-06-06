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
    marginTop: '-1em',
    padding: '2em 1em',
    paddingBottom: '4em',
    height: '100%',
    boxSizing: 'border-box'
  }
})

const style = (name) => {
  const _style = stylesheet[name]
  return css(_style)
}

export default style
