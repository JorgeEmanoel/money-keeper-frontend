import React from 'react'

import { HomePage } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import { ProfilePage } from '../pages/Profile'
import { SkeletonsPage } from '../pages/Profile/Skeletons'
import { RegisterPage } from '../pages/Register'
import { TransactionsPage } from '../pages/Transactions'

export const ROUTES = [
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
  },
  {
    path: '/transactions',
    element: <TransactionsPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/profile/skeletons',
    element: <SkeletonsPage />
  }
]
