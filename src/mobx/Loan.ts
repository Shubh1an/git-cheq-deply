import {observable, action, runInAction, makeAutoObservable, computed} from 'mobx'
import {MobxStore} from './'
// import BankList from '../../app/Entities/BankMaster/BankMaster'

export interface LoanType {
  loanList: any[]
  currentPage: number
  itemPerPage: number
  totalListLength: any
  isLoading: boolean
}
class Loans implements LoanType {
  @observable loanList: any[] = []
  @observable currentPage: number = 1
  @observable itemPerPage: number = 10
  @observable totalListLength: any
  @observable isLoading: boolean = false
  constructor(private rootStore: MobxStore) {
    makeAutoObservable(this)
  }

  @action
  setLoanList = (loanData: any) => {
    console.log('from loan', loanData)
    this.loanList = loanData.bbpsLoans
    this.totalListLength = loanData.totalCount
    return this.loanList
  }
  @action
  setPage = (page: number) => {
    this.currentPage = page
  }

  @action
  setLoading = (loading: boolean) => {
    this.isLoading = loading
    return this.isLoading
  }
}
export default Loans
