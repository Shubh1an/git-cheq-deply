import {Navigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {MobxStore} from '../mobx'
import {apiDelete, apiGet, apiPost, apiPut} from '../utiils/axios'

const API_URL = process.env.REACT_APP_API_URL

// API LIST

const GET_LOAN_PROVIDER_LIST = `${API_URL}/loanProviders/bbpsLoanProvidersSortBy10`
class Loan {
  private readonly mobxStore: MobxStore

  constructor() {
    this.mobxStore = MobxStore.getInstance()
  }
  getLoanList = async (skip: number, take: number) => {
    try {
      this.setLoading(true)
      const loanProvListResp = await apiGet(GET_LOAN_PROVIDER_LIST + `?skip=${skip}&take=${take}`)
      this.setLoading(false)

      return this.setLoanList(loanProvListResp?.data)
    } catch (error) {
      this.setLoading(false)
      return Promise.reject(error)
    }
  }

  setLoanList = (loanData: any) => {
    return this.mobxStore.loanProv.setLoanList(loanData)
  }
  //   removeBank = async (id: any) => {
  //     try {
  //       console.log('from delete', id)
  //       const resp = await apiDelete(DELETE_BANK, id)
  //       this.getAllBanks()
  //     } catch (error) {
  //       return Promise.reject(error)
  //     }
  //   }
  setPage = (pageNo: number) => {
    console.log('from set page', pageNo)
    this.mobxStore.loanProv.setPage(pageNo)
    this.getLoanList(
      this.mobxStore.loanProv.itemPerPage * pageNo - this.mobxStore.loanProv.itemPerPage,
      this.mobxStore.loanProv.itemPerPage
    )
  }
  setLoading = (loading: boolean) => {
    return this.mobxStore.bankStore.setLoading(loading)
  }
}
export default new Loan()
