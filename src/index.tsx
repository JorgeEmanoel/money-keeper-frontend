import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import './translation/config'

import { ToastContainer } from 'react-toastify'

// Styles
import 'react-toastify/dist/ReactToastify.css'

import { ROUTES } from './routes'

// TODO: separate
const router = createBrowserRouter(ROUTES)

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
