import {observable, action, runInAction, makeAutoObservable, computed} from 'mobx'
import { isLogin } from '../utiils/isLogin'
import {MobxStore} from './'
// import BankList from '../../app/Entities/BankMaster/BankMaster'


interface UserInterface {
  token : string
  username : string
  email : string
  role : string,
}



export interface AuthType {
  user: UserInterface
  isLoading : boolean 
  isLogin : boolean
}
class Auth implements AuthType {
  @observable user: UserInterface = {token : "", username : "", email : "", role : ""}
  @observable isLoading: boolean = false
  @observable isLogin: boolean = isLogin()

  constructor(private rootStore: MobxStore) {
    makeAutoObservable(this)
  }

  @action setUser = (user : any) => {
    this.user = user
    return this.user
  }

  
  @action setLoading = (loading:boolean) => {
    this.isLoading =loading
    return this.isLoading
  }

  @action setIsLogin = (isLogin : boolean) => {
    this.isLogin = isLogin
    return isLogin
  }
}
export default Auth
