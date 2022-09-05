import {toast} from 'react-toastify'
import {CREATE_PRODUCR} from '../app/modules/product/core/_requests'
import {MobxStore} from '../mobx'
import {apiDelete, apiGet, apiPost, apiPut} from '../utiils/axios'
const API_URL = process.env.REACT_APP_API_URL

// API LIST
const GET_PRODUCT_LIST = `${API_URL}/product/getAllProductMaster`
const DELETE_PRODUCT = `${API_URL}/product/deleteProductMasterById`
const UPDATE_PRODUCT = `${API_URL}/product/updateCardPrefixNumber`
const GET_PRODUCT_DETAILS = `${API_URL}/product/getProductMasterById`
class Products {
  private readonly mobxStore: MobxStore

  constructor() {
    this.mobxStore = MobxStore.getInstance()
  }
  getAllProducts = async () => {
    try {
      this.setLoading(true)
      const resp = await apiGet(GET_PRODUCT_LIST)

      this.setLoading(false)
      return this.setProductList(resp?.data?.data)
    } catch (error) {
      this.setLoading(false)
      return Promise.reject(error)
    }
  }
  createProduct = async (payload: any) => {
    console.log('from payload', payload)
    try {
      this.setLoading(true)
      const resp = await apiPost(CREATE_PRODUCR, payload)
      if (resp?.data?.message === 'Product already exist for this bank') {
        return toast.error(resp?.data?.message)
      }
      if (resp?.data?.message === 'Unknown bank data') {
        return toast.error(resp?.data?.message)
      }
      this.setLoading(false)
      return Promise.resolve(resp)
    } catch (error) {
      console.log(error)
    }
  }
  setProductList = (bankData: any) => {
    return this.mobxStore.productStore.setProductList(bankData)
  }
  getProductDetailId = async (id: any) => {
    try {
      const resp = await apiGet(GET_PRODUCT_DETAILS + `?id=${id}`)
      return Promise.resolve(resp)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  updateProductById = async (payload: any) => {
    console.log('from payload', payload)
    try {
      this.setLoading(true)
      const resp = await apiPut(UPDATE_PRODUCT, payload)
      return Promise.resolve(resp)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  removeProduct = async (id: any) => {
    try {
      console.log('from delete', id)
      const resp = await apiDelete(DELETE_PRODUCT + `?id=${id}`, null)
      this.getAllProducts()
    } catch (error) {
      return Promise.reject(error)
    }
  }
  clearProductList = () => {
    return this.mobxStore.productStore.setProductList([])
  }
  setLoading = (loading: boolean) => {
    return this.mobxStore.productStore.setLoading(loading)
  }
}
export default new Products()
