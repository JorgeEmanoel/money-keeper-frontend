import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

// Pages
import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/Register'

// Styles
import 'react-toastify/dist/ReactToastify.css'
import { HomePage } from './pages/Home'

// TODO: separate
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/home',
    element: <HomePage />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
)

// TODO: enable service worker
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// TODO: monitoring
reportWebVitals()
