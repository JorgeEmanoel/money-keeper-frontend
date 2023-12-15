import { BaseService } from '../shares/services/BaseService'

export const LOCAL_STORAGE_TOKEN_KEY = String(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY)

export interface LoginResponse {
  token: string
  message: string
}

export interface RegistrationResponse {
  message: string
}

export interface RegistrationPayload {
  ok: boolean
  message: string
}

export interface LoginPayload {
  ok: boolean
  message: string
  token: string
}

export const Auth = {
  register: async (name: string, email: string, password: string, passwordConfirmation: string): Promise<RegistrationPayload> => await BaseService.post('/register', {
    name,
    email,
    password,
    passwordConfirmation
  }).then(() => ({
    ok: true,
    message: ''
  })).catch(error => {
    console.error('Registration failed: ', error)
    return {
      ok: false,
      message: (error.response.data as RegistrationResponse).message
    }
  }),
  login: async (email: string, password: string): Promise<LoginPayload> => await BaseService.post('/login', {
    email,
    password
  }).then((response) => {
    const token = (response.data as LoginResponse).token

    return {
      ok: true,
      token,
      message: ''
    }
  }).catch(error => {
    console.error('Login failed: ', error)
    return {
      ok: false,
      token: '',
      message: (error.response.data as LoginResponse).message
    }
  }),
  token: (): string => {
    return String(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))
  },
  saveToken: (token: string): void => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
  }
}
