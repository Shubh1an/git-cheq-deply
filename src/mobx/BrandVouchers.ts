import {observable, action, makeAutoObservable} from 'mobx'
import {MobxStore} from './'
// import BankList from '../../app/Entities/BankMaster/BankMaster'

export interface BrandVouchersType {
  brandVouchersList: any
  isLoading: boolean
}
class BrandVouchers implements BrandVouchersType {
  @observable brandVouchersList: any = []
  @observable isLoading: boolean = false
  constructor(private rootStore: MobxStore) {
    makeAutoObservable(this)
  }

  @action
  setbrandVouchersList = (voucherCategory: any) => {
    this.brandVouchersList = voucherCategory
    return this.brandVouchersList
  }

  @action
  setLoading = (loading: boolean) => {
    this.isLoading = loading
    return this.isLoading
  }
}
export default BrandVouchers
