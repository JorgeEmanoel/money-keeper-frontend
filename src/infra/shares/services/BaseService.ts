import axios from 'axios'

export const BaseService = axios.create({
  baseURL: process.env.REACT_APP_BFF_BASE_URL
})
