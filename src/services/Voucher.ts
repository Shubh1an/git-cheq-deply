import {Navigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {MobxStore} from '../mobx'
import {apiDelete, apiGet, apiPost, apiPut} from '../utiils/axios'

const API_URL = process.env.REACT_APP_API_URL

// API LIST
const GET_VOUCHER_CATEGORY_LIST = `${API_URL}/vouchers/getAllVoucherCM`
const GET_VOUCHER_BY_ID = `${API_URL}/vouchers/getVoucherCMbyId?id`
const CREATE_VOUCHER = `${API_URL}/vouchers/createVoucherCM`
const UPDATE_VOUCHER = `${API_URL}/vouchers/updateVoucherCM?id`
const DELETE_VOUCHER_CATEOGRY = `${API_URL}/vouchers/deleteVoucherCM?id`
const UPLOAD_VOUCHER_LOGO = `${API_URL}/vouchers/uploadVoucherCMImg`
class Voucher {
  private readonly mobxStore: MobxStore

  constructor() {
    this.mobxStore = MobxStore.getInstance()
  }

  getVoucherCategoryList = async () => {
    try {
      this.setLoading(true)
      const res = await apiGet(GET_VOUCHER_CATEGORY_LIST)
      console.log(res)
      this.setLoading(false)
      return this.setVoucherCategoryList(res?.data?.data)
    } catch (error) {
      this.setLoading(false)
      return Promise.reject(error)
    }
  }

  setVoucherCategoryList = (list: any) => {
    return this.mobxStore.voucherStore.setVoucherCategoryList(list)
  }
  createVoucherCategoryList = async (payload: any, img: any) => {
    console.log('VOUCHER PAYLOAD=>>>>>>>>>>>>>>>>>>>>>>', payload, img)
    try {
      this.setLoading(true)
      const res = await apiPost(CREATE_VOUCHER, payload)
      console.log('frm create voucher api->>>>>>>>>>>>>', res)
      this.setLoading(false)
      if (img) {
        await this.handlVouchersLogo(res?.data?.savedData?._id, img)
      }
      this.setLoading(false)
      if (res.data.httpStatus == 500) {
        toast.error('Voucher Category already exist')
        return false
      }
      toast.success('succesfully created')
      Promise.resolve(res.data)
      return true
    } catch (error) {
      Promise.reject(error)
    }
  }
  updateVouchers = async (id: any, payload: any, img: any) => {
    console.log(img)
    try {
      this.setLoading(true)
      const res = await apiPost(UPDATE_VOUCHER + `=${id}`, payload)
      if (img) {
        await this.handlVouchersLogo(res?.data?.savedData?._id, img)
      }
      this.setLoading(false)
    } catch (error) {
      Promise.reject(error)
    }
  }
  getVoucherById = async (id: any) => {
    try {
      this.setLoading(true)
      const res = await apiGet(GET_VOUCHER_BY_ID + `=${id}`)
      console.log('from get=>>>>>>>', res)
      this.setLoading(false)
      return Promise.resolve(res?.data?.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  handlVouchersLogo = async (id: string, logo: any) => {
    try {
      const formData: any = new FormData()
      console.log('UPLOAD_LOGO - ', {
        id,
        logo,
      })
      formData.append('voucherCMId', id)
      formData.append('bgImg', logo)
      const voucherLogo = await this.uploadVoucherLogo(formData)
      return Promise.resolve(voucherLogo.data)
    } catch (error) {
      toast.error('something went wrong')
      return Promise.reject(error)
    }
  }
  uploadVoucherLogo = async (payload: any) => {
    try {
      const resp = apiPost(UPLOAD_VOUCHER_LOGO, payload)
      return resp
    } catch (error) {
      return Promise.reject(error)
    }
  }
  clearVoucherCategoryList = () => {
    return this.mobxStore.voucherStore.setVoucherCategoryList([])
  }

  removeVoucherCategoryList = async (id: string) => {
    try {
      this.setLoading(true)
      await apiDelete(`${DELETE_VOUCHER_CATEOGRY}=${id}`, {})
      this.getVoucherCategoryList()
      toast.info('Successfully Deleted!')
    } catch (error) {
      this.setLoading(false)
      return Promise.reject(error)
    }
  }

  setLoading = (loading: boolean) => {
    return this.mobxStore.voucherStore.setLoading(loading)
  }
}
export default new Voucher()
