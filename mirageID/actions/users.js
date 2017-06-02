import axios from 'axios'
const baseUrl = 'https://api.mirageid.com'

const actions = {
  login: ({username, password}) => {
    axios.post(`${baseUrl}/users/sessions`, {
      username,
      password
    }).then((response) => {
      window.localStorage.setItem('user', JSON.stringify(response.data))
      window.store.dispatch({
        type: 'SET_USER',
        value: response.data
      })
    })
  },
  signup: ({username, password}) => {
    axios.post(`${baseUrl}/users`, {
      username,
      password
    }).then((response) => {
      window.localStorage.setItem('user', JSON.stringify(response))
    })
  }
}

export default actions
