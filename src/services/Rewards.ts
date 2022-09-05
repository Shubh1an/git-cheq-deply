import {Navigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {MobxStore} from '../mobx'
import {apiDelete, apiGet, apiPost, apiPut} from '../utiils/axios'

const API_URL = process.env.REACT_APP_API_URL

// API LIST

const GET_REWARD_LIST = `${API_URL}/rewards/allRewardModules`
const UPDATE_PRIORITY_REWARDS = `${API_URL}/rewards/updateModule`
class Bank {
  private readonly mobxStore: MobxStore

  constructor() {
    this.mobxStore = MobxStore.getInstance()
  }
  getRewardList = async () => {
    try {
      this.setLoading(true)
      const rewardListResp = await apiGet(GET_REWARD_LIST)
      console.log('frommmm', rewardListResp?.data?.data)
      this.setLoading(false)
      return this.onGetRewardList(rewardListResp?.data?.data)
    } catch (error) {
      this.setLoading(false)
      return Promise.reject(error)
    }
  }

  onGetRewardList = (RewardData: any) => {
    let activeRewards = RewardData.filter((item: any) => item.isActive)
    let inActiveRewards = RewardData.filter((item: any) => !item.isActive)
    return this.mobxStore.rewardStore.setRewardList(activeRewards, inActiveRewards)
  }

  setTotalRewardList = (rewardData: any) => {
    this.mobxStore.rewardStore.setTotalRewardList(rewardData)
  }
  updateRewardList = async (totalRewards: any) => {
    const {activeRewardList, inActiveRewardList} = totalRewards

    // console.log('from update>>>>>>>>>>>>>>>>', JSON.parse(JSON.stringify(inActiveRewardList)))
    console.log('from update>>>>>>>>>>>>>>>>', [
      ...JSON.parse(JSON.stringify(activeRewardList)),
      ...JSON.parse(JSON.stringify(inActiveRewardList)),
    ])
    try {
      const updateresp = await apiPost(UPDATE_PRIORITY_REWARDS, [
        ...JSON.parse(JSON.stringify(activeRewardList)),
        ...JSON.parse(JSON.stringify(inActiveRewardList)),
      ])
      console.log('from update=>>>>>>>>', updateresp.data.message)
      if ((updateresp.data.message = 'success')) {
        toast.success('succesfully Updated')
        this.getRewardList()
      }
    } catch (error) {
      this.setLoading(false)
      Promise.reject(error)
    }
  }

  onDrag = (result: any) => {
    console.log('RESULT - ', result)
    if (!result.destination) {
      return
    }
    let listCopy: any = {...this.mobxStore.rewardStore.totalRewardList}

    const sourceList = listCopy[result.source.droppableId]
    const [removedElement, newSourceList] = this.removeFromList(sourceList, result.source.index)

    listCopy[result.source.droppableId] = newSourceList
    const destinationList = listCopy[result.destination.droppableId]
    listCopy[result.destination.droppableId] = this.addToList(
      destinationList,
      result.destination.index,
      removedElement
    )
    listCopy[result.source.droppableId] = JSON.parse(
      JSON.stringify(listCopy[result.source.droppableId])
    ).map((i: any, j: any) => {
      i.priority = j + 1
      return i
    })
    listCopy[result.destination.droppableId] = JSON.parse(
      JSON.stringify(listCopy[result.destination.droppableId])
    ).map((i: any, j: any) => {
      i.priority = j + 1
      return i
    })
    if (result.destination.droppableId == 'activeRewardList') {
      listCopy[result.destination.droppableId] = JSON.parse(
        JSON.stringify(listCopy[result.destination.droppableId])
      ).map((i: any) => {
        i.isActive = true
        return i
      })
    }
    if (result.destination.droppableId == 'inActiveRewardList') {
      listCopy[result.destination.droppableId] = JSON.parse(
        JSON.stringify(listCopy[result.destination.droppableId])
      ).map((i: any) => {
        i.isActive = false
        return i
      })
    }
    console.log('from drag>>>>>>>>>>>>>>>>>>>>>>>>>', listCopy)
    this.setTotalRewardList(listCopy)
  }

  removeFromList = (list: any, index: any) => {
    const result = Array.from(list)

    const [removed] = result.splice(index, 1)
    return [removed, result]
  }

  addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list)
    result.splice(index, 0, element)
    return result
  }
  setLoading = (loading: boolean) => {
    return this.mobxStore.bankStore.setLoading(loading)
  }

  clearActiveRewardList = () => {
    return this.mobxStore.rewardStore.setRewardList([], [])
  }
}
export default new Bank()
