import {observable, action, runInAction, makeAutoObservable, computed} from 'mobx'
import {MobxStore} from './'
// import BankList from '../../app/Entities/BankMaster/BankMaster'

export interface BankType {
  voucherCategoryList: any
  isLoading: boolean
}
class Voucher implements BankType {
  @observable voucherCategoryList: any = []
  @observable isLoading: boolean = false
  constructor(private rootStore: MobxStore) {
    makeAutoObservable(this)
  }

  @action
  setVoucherCategoryList = (voucherCategory: any) => {
    this.voucherCategoryList = voucherCategory
    return this.voucherCategoryList
  }

  @action
  setLoading = (loading: boolean) => {
    this.isLoading = loading
    return this.isLoading
  }
}
export default Voucher
