import axios from 'axios'

const GET_USERS=`${process.env.REACT_APP_API_URL}/dashboard`
export function getTotalUsers() {
  return axios.get<any>(GET_USERS)
}