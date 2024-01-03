import { BaseAuthService } from '../shared/services/BaseAuthService'

export const LOCAL_STORAGE_ME_KEY = String(process.env.REACT_APP_LOCAL_STORAGE_ME_KEY)

interface MePayload {
  id: number
  name: string
  email: string
  currentPlanId: number
}

export const User = {
  retrieveAndPersistMe: async (): Promise<void> => {
    await BaseAuthService().get('/me').then((response) => {
      localStorage.setItem(LOCAL_STORAGE_ME_KEY, JSON.stringify(response.data))
    }).catch(error => {
      console.error('Me retrieving failed: ', error)
    })
  },
  me: (): MePayload => {
    return JSON.parse(String(localStorage.getItem(LOCAL_STORAGE_ME_KEY))) as MePayload
  }
}
