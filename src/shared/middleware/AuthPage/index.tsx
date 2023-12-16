import React from 'react'
import { Auth } from '../../../infra/services/Auth'
import { Navigate } from 'react-router-dom'

type AuthPageHOC = () => React.ReactElement

export const AuthPage = (Component: React.JSXElementConstructor<any>): AuthPageHOC => {
  return function _AuthPage (): React.ReactElement {
    if (Auth.authenticated()) {
      return <Component />
    }

    return <Navigate to="/" />
  }
}
