import axios, { type AxiosInstance } from 'axios'
import { Auth } from '../../services/Auth'

export const LOCAL_STORAGE_TOKEN_KEY = String(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY)
export const LOCAL_STORAGE_ME_KEY = String(process.env.REACT_APP_LOCAL_STORAGE_ME_KEY)

export const BaseAuthService = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BFF_BASE_URL,
    headers: {
      Authorization: Auth.token()
    }
  })

  instance.interceptors.response.use(r => r, err => {
    if (err.response.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
      localStorage.removeItem(LOCAL_STORAGE_ME_KEY)
    }
  })

  return instance
}
