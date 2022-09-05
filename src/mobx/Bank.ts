import {observable, action, runInAction, makeAutoObservable, computed} from 'mobx'
import {MobxStore} from './'
// import BankList from '../../app/Entities/BankMaster/BankMaster'
interface BankInterface {
  logo: string
  IFSC_Prefix: string
  originalBankName: string
  bureauBankName: string
  isActive: boolean
  createdAt: any
}

export interface BankType {
  bankList: BankInterface[]
  isLoading: boolean
}
class AllBanks implements BankType {
  @observable bankList: BankInterface[] = []
  @observable isLoading: boolean = false
  constructor(private rootStore: MobxStore) {
    makeAutoObservable(this)
  }

  @action
  setBankList = (bankData: any) => {
    this.bankList = bankData
    return this.bankList
  }

  @action
  setLoading = (loading: boolean) => {
    this.isLoading = loading
    return this.isLoading
  }
}
export default AllBanks
