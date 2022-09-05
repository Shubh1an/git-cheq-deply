import {MobxStore} from '../mobx'
import { apiGet, apiPost } from '../utiils/axios'

const API_URL = process.env.REACT_APP_API_URL

// API LIST
const LOGIN_URL = `${API_URL}/login`
const MY_PROFILE =  `${API_URL}/me`



class Auth {
  private readonly mobxStore: MobxStore

  constructor() {
    this.mobxStore = MobxStore.getInstance()
  }
 

  login =async (payload :any) => {
    try {
      const res = await apiPost(LOGIN_URL, payload)
      localStorage.setItem('authToken' , res?.data?.data?.token)
      this.mobxStore.authStore.setIsLogin(true)
      this.setUser(res?.data?.data?.user)
    }
    catch(error) {
      return Promise.reject(error)

    }
  }

  setUser = (user : any) => {
    return this.mobxStore.authStore.setUser(user)
  }

  logout = () => {
    localStorage.clear()
    this.mobxStore.authStore.setIsLogin(false)
    return this.mobxStore.authStore.setUser( {token : "", username : "", email : "", role : ""})
  }

  getMyProfile =async () => {
    try {

      const res = await apiGet(MY_PROFILE)
      return this.setUser(res?.data?.data)
    }

    catch(error:any) {
      if(error.status === 401) {
        this.logout()
        window.location.reload()
      }
      return Promise.reject(error)

    }
  }

 
}
export default new Auth()
