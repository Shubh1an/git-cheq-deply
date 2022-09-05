import axios from 'axios'
import {EventModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_PRODUCT_LIST = `${API_URL}/product/getAllProductMaster`
export const DELETE_PRODUCT = `${API_URL}/product/deleteProductMasterById`
export const CREATE_PRODUCR = `${API_URL}/product/addProductMaster`
export const GET_PRODUCT_DETAILS = `${API_URL}/product/getProductMasterById`
export const UPDATE_PRODUCT = `${API_URL}/product/updateCardPrefixNumber`

export function fetchProductList() {
  return axios.get<any>(GET_PRODUCT_LIST)
}

export function deleteProductById(id: string) {
  return axios.delete<any>(DELETE_PRODUCT + `?id=${id}`)
}

export function createProduct(payload: any) {
  return axios.post<any>(CREATE_PRODUCR, payload)
}

export function getProductDetails(id: string) {
  return axios.get<any>(GET_PRODUCT_DETAILS + `?id=${id}`)
}

export function updateProductById(payload: any) {
  return axios.put<any>(UPDATE_PRODUCT, payload)
}
