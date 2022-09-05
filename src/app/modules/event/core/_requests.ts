import axios from 'axios'
import { apiGet } from '../../../../utiils/axios'
import { EventModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const CREATE_EVENT = `${API_URL}/offer/addEvent`
export const GET_EVENT = `${API_URL}/offer/getEvent`
export const GET_EVENT_CODE = `${API_URL}/offer/eventNameInCode`

// Server should return Event Model
export function createEvent(name: string, event_name_in_code : string, LifeTimeOnce : boolean, availableAttributes : string[]) {
  return axios.post<EventModel>(CREATE_EVENT, {
    name,
    event_name_in_code,
    LifeTimeOnce,
    availableAttributes
  })
}

// Server should return Event Model
export function getEvent() {
  return apiGet(GET_EVENT)
}

// Server should return Event Model
export function getEventCode() {
  return apiGet(GET_EVENT_CODE)
}
