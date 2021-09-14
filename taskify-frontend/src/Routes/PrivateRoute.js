import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isLogin} from '../utils/localstorage'

const PrivateRoute = ({component: Component, ...rest}) => {
  console.log({isLogin: isLogin()})
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  )
}

export default PrivateRoute
