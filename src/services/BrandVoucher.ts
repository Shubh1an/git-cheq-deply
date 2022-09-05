import {Navigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {MobxStore} from '../mobx'
import {apiDelete, apiGet, apiPost, apiPut} from '../utiils/axios'

const API_URL = process.env.REACT_APP_API_URL

// API LIST
const GET_BRAND_VOUCHER_CATEGORY_LIST = `${API_URL}/vouchers/getAllBrandVoucherMaster`
const GET_BRAND_VOUCHER_BY_ID = `${API_URL}/vouchers/getBrandVoucherMasterById?id`
const CREATE_BRAND_VOUCHER = `${API_URL}/vouchers/addBrandVoucherMaster`
const UPDATE_BRAND_VOUCHER = `${API_URL}/vouchers/updateBrandVoucherMaster?id`
const DELETE_BRAND_VOUCHER_CATEOGRY = `${API_URL}/vouchers/deleteBrandVoucherById?id`
const UPLOAD_BRAND_VOUCHER_LOGO = `${API_URL}/vouchers/uploadBVMasterimg`
class BrandVoucher {
  private readonly mobxStore: MobxStore

  constructor() {
    this.mobxStore = MobxStore.getInstance()
  }

  getBrandVoucherCategoryList = async () => {
    try {
      this.setLoading(true)
      const res = await apiGet(GET_BRAND_VOUCHER_CATEGORY_LIST)
      console.log('from brand vouchers', res.data.data)
      this.setLoading(false)
      return this.onGetBrandVouchersCategoryList(res?.data?.data)
    } catch (error) {
      this.setLoading(false)
      return Promise.reject(error)
    }
  }

  onGetBrandVouchersCategoryList = (list: any) => {
    return this.mobxStore.brandVoucherStore.setbrandVouchersList(list)
  }
  createBrandVoucherCategoryList = async (payload: any, topDealImg: any, otherOffersImg: any) => {
    console.log('VOUCHER PAYLOAD=>>>>>>>>>>>>>>>>>>>>>>', payload, topDealImg, otherOffersImg)
    try {
      this.setLoading(true)
      const res = await apiPost(CREATE_BRAND_VOUCHER, payload)
      console.log('frm create voucher api->>>>>>>>>>>>>', res)
      this.setLoading(false)

      if (topDealImg || otherOffersImg) {
        await this.handlBrandVouchersLogo(res?.data?.data?._id, topDealImg, otherOffersImg)
      }
      this.setLoading(false)
      if (res?.status == 500) {
        return false
      }
      this.setLoading(false)
      toast.success('succesfully created')
      Promise.resolve(res.data)
      return true
    } catch (error: any) {
      this.setLoading(false)
      toast.error(error?.data?.message)
      return Promise.reject(error)
    }
  }
  updateBrandVouchers = async (id: any, payload: any, topDealImg: any, otherOffersImg: any) => {
    console.log(topDealImg, otherOffersImg)
    try {
      this.setLoading(true)
      const res = await apiPut(UPDATE_BRAND_VOUCHER + `=${id}`, payload)
      console.log('from update voucers->>>>>>>>>>>>>>>>>>', res)
      if (topDealImg || otherOffersImg) {
        await this.handlBrandVouchersLogo(res?.data?.updateVoucher?._id, topDealImg, otherOffersImg)
      }
      this.setLoading(false)
      if (res?.status == 500) {
        toast.error('Voucher Category already exist')
        return false
      }
      this.setLoading(false)
      toast.success('succesfully updated')
      Promise.resolve(res.data)
    } catch (error: any) {
      this.setLoading(false)
      toast.error('Voucher Category already exist')
      return Promise.reject(error)
    }
  }
  getBrandVoucherById = async (id: any) => {
    try {
      this.setLoading(true)
      const res = await apiGet(GET_BRAND_VOUCHER_BY_ID + `=${id}`)
      this.setLoading(false)
      return Promise.resolve(res?.data?.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  handlBrandVouchersLogo = async (id: string, topDealimg: any, otherOfferimg: any) => {
    try {
      const formData: any = new FormData()
      console.log('UPLOAD_LOGO - ', {
        id,
        topDealimg,
        otherOfferimg,
      })

      if (id) {
        formData.append('bvMasterId', id)
        formData.append('bgImgTopDeal', topDealimg)
        formData.append('bgImgOtherOffer', otherOfferimg)
        const voucherLogo = await this.uploadBrandVoucherLogo(formData)
        return Promise.resolve(voucherLogo.data)
      }
    } catch (error) {
      toast.error('something went wrong')
      return Promise.reject(error)
    }
  }
  uploadBrandVoucherLogo = async (payload: any) => {
    try {
      const resp = apiPost(UPLOAD_BRAND_VOUCHER_LOGO, payload)
      return resp
    } catch (error) {
      return Promise.reject(error)
    }
  }
  clearBrandVoucherCategoryList = () => {
    return this.mobxStore.brandVoucherStore.setbrandVouchersList([])
  }

  removeBrandVoucherCategoryList = async (id: string) => {
    try {
      this.setLoading(true)
      await apiDelete(`${DELETE_BRAND_VOUCHER_CATEOGRY}=${id}`, {})
      this.getBrandVoucherCategoryList()
      toast.info('Successfully Deleted!')
    } catch (error) {
      this.setLoading(false)
      return Promise.reject(error)
    }
  }

  setLoading = (loading: boolean) => {
    return this.mobxStore.brandVoucherStore.setLoading(loading)
  }
}
export default new BrandVoucher()
