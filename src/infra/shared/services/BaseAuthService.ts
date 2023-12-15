import axios from 'axios'
import { Auth } from '../../services/Auth'

export const BaseAuthService = axios.create({
  baseURL: process.env.REACT_APP_BFF_BASE_URL,
  headers: {
    Authorization: Auth.token()
  }
})
