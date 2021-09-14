const key = 'TASKIFY_CLONE'
export const token_key = 'TASKIFY_TOKEN'
export const setItem = storeState => {
  window.localStorage.setItem(key, JSON.stringify(storeState))
}

export const setToken = token => {
  window.localStorage.setItem(token_key, JSON.stringify(token))
}

export const getToken = () => {
  let token = window.localStorage.getItem(token_key)
  console.log({token})
  if (!!token) return JSON.parse(token)
  return false
}

export const isLogin = () => {
  if (!!getToken()) {
    return true
  }
  return false
}

export const logout = () => {
  window.localStorage.clear()
}
