import Bank from './Bank'
import Products from './Product'
import Auth from './Auth'
import Loans from './Loan'
import Rewards from './Reward'
import Voucher from './Voucher'
import BrandVouchers from './BrandVouchers'

export class MobxStore {
  bankStore: Bank
  productStore: Products
  authStore: Auth
  loanProv: Loans
  rewardStore: Rewards
  voucherStore: Voucher
  brandVoucherStore: BrandVouchers
  constructor() {
    this.bankStore = new Bank(this)
    this.productStore = new Products(this)
    this.authStore = new Auth(this)
    this.loanProv = new Loans(this)
    this.rewardStore = new Rewards(this)
    this.voucherStore = new Voucher(this)
    this.brandVoucherStore = new BrandVouchers(this)
  }

  static instance: MobxStore
  static getInstance(): MobxStore {
    if (!this.instance) {
      this.instance = new MobxStore()
    }
    return this.instance
  }
}
