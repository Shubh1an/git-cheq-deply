import {Navigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {MobxStore} from '../mobx'
import {apiDelete, apiGet, apiPost, apiPut} from '../utiils/axios'

const API_URL = process.env.REACT_APP_API_URL

// API LIST
const GET_BANK_LIST = `${API_URL}/bankMaster/getAllBanks`
const TOP_BANKS_LIST = `${API_URL}/bankMaster/getbankByRank`
const DELETE_BANK = `${API_URL}/bankMaster/deleteBankByID`
const BANK_MASTER_ADD = `${API_URL}/bankMaster/addBank`
const GET_BANK_MASTER = `${API_URL}/bankMaster/getAllBanks`
const GET_BANK_MASTER_BY_RANK = `${API_URL}/bankMaster/getbankByRank`
const BANK_MASTER_UPDATE = `${API_URL}/bankMaster/updateBankMasterV1`
// const BANK_MASTER_UPDATE = `${API_URL}/bankMaster/updateBankMaster`
const GET_BANK_DETAIL = `${API_URL}/bankMaster/getBankByName`
const UPLOAD_BANK_MASTER_LOGO = `${API_URL}/bankMaster/uploadBankMasterLogo`
const GET_BANK_RANK = `${API_URL}/bankMaster/getbankByRank`
const UPDATE_BANK_RANK = `${API_URL}/bankMaster/updateRank`
const VALIDATE_IFSC = `${API_URL}/bankMaster/validateIfsc`
class Bank {
  private readonly mobxStore: MobxStore

  constructor() {
    this.mobxStore = MobxStore.getInstance()
  }
  getAllBanks = async () => {
    try {
      this.setLoading(true)
      const bankListResp = await apiGet(GET_BANK_LIST)
      this.setLoading(false)
      return this.setBankList(bankListResp?.data?.data?.data)
    } catch (error) {
      this.setLoading(false)
      return Promise.reject(error)
    }
  }

  getTopBankList = async () => {
    try {
      this.setLoading(true)
      const bankListResp = await apiGet(TOP_BANKS_LIST)
      this.setLoading(false)
      return this.setBankList(bankListResp?.data?.data)
    } catch (error) {
      this.setLoading(false)
      return Promise.reject(error)
    }
  }

  setBankList = (bankData: any) => {
    return this.mobxStore.bankStore.setBankList(bankData)
  }
  removeBank = async (id: any) => {
    try {
      console.log('from delete', id)
      const resp = await apiDelete(DELETE_BANK + `?id=${id}`, null)
      this.getAllBanks()
    } catch (error) {
      return Promise.reject(error)
    }
  }
  setLoading = (loading: boolean) => {
    return this.mobxStore.bankStore.setLoading(loading)
  }

  clearBankList = () => {
    return this.mobxStore.bankStore.setBankList([])
  }
  addBank = async (
    originalBankName: string,
    bureauBankName: string,
    logo: any,
    IFSC_Prefix: string,
    logoWithName: any,
    outerGridGradientColors: any,
    innerGridGradientColors: any,
    alias: string[],
    img: any,
    imgPath: any,
    imgWithName: any,
    imgWithNamePath: any
  ) => {
    try {
      this.setLoading(true)
      console.log('from second api', img, imgWithName)
      const resp = await apiPost(BANK_MASTER_ADD, {
        originalBankName,
        bureauBankName,
        logo,
        IFSC_Prefix,
        logoWithName,
        outerGridGradientColors,
        innerGridGradientColors,
        alias,
        // img,
        // imgPath,
        // imgWithName,
        // imgWithNamePath,
      })
      console.log('ADD_BANK_MASTERRESP - ', resp.status, resp.data)
      if (img || imgWithName) {
        await this.getBankByName(resp?.data?.data?.data?._id, img, imgWithName)
      }

      toast.success('succesfully created')
      this.setLoading(false)
      return Promise.resolve(resp.data)
    } catch (error: any) {
      console.log('ADD-BANK-ERR - ', error?.message)
      this.setLoading(false)
      toast.error('something went wrong')
      return Promise.reject(error)
    }
  }
  getBankByName = async (id: string, logo: any, logoWithName: any) => {
    try {
      return this.handlBankMasterLogo(id, logo, logoWithName)
    } catch (error) {
      toast.error('something went wrong')
      return Promise.reject(error)
    }
  }
  getBankDetails = async (bankName: string) => {
    try {
      const resp = await apiGet(GET_BANK_DETAIL + `?originalBankName=${bankName}`)
      return resp
    } catch (error) {
      return Promise.reject(error)
    }
  }
  uploadBankMasterLogo = async (payload: any) => {
    try {
      const resp = apiPost(UPLOAD_BANK_MASTER_LOGO, payload)
      return resp
    } catch (error) {
      return Promise.reject(error)
    }
  }
  handlBankMasterLogo = async (id: string, logo: any, logoWithName: any) => {
    try {
      const formData: any = new FormData()
      console.log('UPLOAD_LOGO - ', {
        id,
        logo,
        logoWithName,
      })
      formData.append('banklogo', logo)
      formData.append('bankLogoWithName', logoWithName)
      formData.append('bankMasterId', id)
      const bankMasterLogo = await this.uploadBankMasterLogo(formData)
      return Promise.resolve(bankMasterLogo.data)
    } catch (error) {
      toast.error('something went wrong')
      return Promise.reject(error)
    }
  }
  getAllBankByRank = async () => {
    try {
      const resp = await apiGet(GET_BANK_RANK)
      return resp
    } catch (error) {
      return Promise.reject(error)
    }
  }
  updateBankMaster = async (
    id: string,
    originalBankName: string,
    bureauBankName: string,
    IFSC_Prefix: string,
    isActive: boolean,
    alias: any,
    outerGridGradientColors?: any,
    innerGridGradientColors?: any,
    img?: any,
    imgWithName?: any
  ) => {
    try {
      const resp = await apiPut(BANK_MASTER_UPDATE + `?id=${id}`, {
        originalBankName,
        bureauBankName,
        IFSC_Prefix,
        isActive,
        alias,
        outerGridGradientColors,
        innerGridGradientColors,
        img,
        imgWithName,
      })
      if (img || imgWithName) {
        await this.getBankByName(resp?.data?.data?.data?._id, img, imgWithName)
      }

      toast.success('succesfully updated')
      this.setLoading(false)
      return Promise.resolve(resp.data)
    } catch (error: any) {
      console.log('ADD-BANK-ERR - ', error?.message)
      this.setLoading(false)
      toast.error('something went wrong')
      return Promise.reject(error)
    }
  }

  updateBankByRank = async (id: any, rank: any) => {
    try {
      const resp = await apiPut(UPDATE_BANK_RANK + `?id=${id}`, {rank})
      return resp
    } catch (error) {
      return Promise.reject(error)
    }
  }
  validateIfsc = async (ifscCode: string) => {
    try {
      const resp = await apiPost(VALIDATE_IFSC, {ifscCode})
      return resp
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
export default new Bank()
