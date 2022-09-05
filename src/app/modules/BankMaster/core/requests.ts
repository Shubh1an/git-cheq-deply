import axios from 'axios'
import {BankModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

const GET_BANK_MASTER = `${API_URL}/bankMaster/getAllBanks`
const GET_BANK_MASTER_BY_RANK = `${API_URL}/bankMaster/getbankByRank`
const DELETE_BANK = `${API_URL}/bankMaster/deleteBankByID`
const BANK_MASTER_ADD = `${API_URL}/bankMaster/addBank`
const BANK_MASTER_UPDATE = `${API_URL}/bankMaster/updateBankMasterV1`
// const BANK_MASTER_UPDATE = `${API_URL}/bankMaster/updateBankMaster`
const GET_BANK_DETAIL = `${API_URL}/bankMaster/getBankByName`
const UPLOAD_BANK_MASTER_LOGO = `${API_URL}/bankMaster/uploadBankMasterLogo`
const GET_BANK_RANK = `${API_URL}/bankMaster/getbankByRank`
const UPDATE_BANK_RANK = `${API_URL}/bankMaster/updateRank`
const VALIDATE_IFSC = `${API_URL}/bankMaster/validateIfsc`
export function getBankMasterData() {
  return axios.get<any>(GET_BANK_MASTER)
}

export function getBankMasterDataByRank() {
  return axios.get<any>(GET_BANK_MASTER_BY_RANK)
}
export function DeleteBankById(id: any) {
  return axios.delete<any>(DELETE_BANK + `?id=${id}`)
}
export function addBankMaster(
  originalBankName: string,
  bureauBankName: string,
  logo: any,
  IFSC_Prefix: string,
  logoWithName: any,
  isActive: boolean,
  outerGridGradientColors: any,
  innerGridGradientColors: any,
  alias: string[]
) {
  console.log('from api hit', logo, logoWithName)
  return axios.post<any>(BANK_MASTER_ADD, {
    originalBankName,
    bureauBankName,
    logo,
    IFSC_Prefix,
    logoWithName,
    isActive,
    outerGridGradientColors,
    innerGridGradientColors,
    alias,
  })
}
export function getBankDetails(bankName: string) {
  return axios.get<any>(GET_BANK_DETAIL + `?originalBankName=${bankName}`)
}
export function updateBankMaster(
  id: string,
  originalBankName: string,
  bureauBankName: string,
  IFSC_Prefix: string,
  logo: any,
  logoWithName: any,
  isActive: boolean,
  alias: any,
  outerGridGradientColors?: any,
  innerGridGradientColors?: any
) {
  return axios.put<any>(BANK_MASTER_UPDATE + `?id=${id}`, {
    originalBankName,
    bureauBankName,
    IFSC_Prefix,
    logo,
    logoWithName,
    isActive,
    outerGridGradientColors,
    innerGridGradientColors,
    alias,
  })
}

export function uploadBankMasterLogo(payload: any) {
  return axios.post(UPLOAD_BANK_MASTER_LOGO, payload)
}
export function getAllBankByRank() {
  return axios.get<any>(GET_BANK_RANK)
}
export function updateBankByRank(id: any, rank: any) {
  return axios.put<any>(UPDATE_BANK_RANK + `?id=${id}`, {rank})
}
export function validateIfsc(ifscCode: string) {
  return axios.post<any>(VALIDATE_IFSC, {ifscCode})
}
