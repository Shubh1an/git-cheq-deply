import {observable, action, runInAction, makeAutoObservable, computed} from 'mobx'
import {actions} from 'react-table'
import {MobxStore} from './'
// import BankList from '../../app/Entities/BankMaster/BankMaster'
type RewardInterface = {
  _id: string
  isActive: boolean
  isDeleted: boolean
  moduleName: string
  priority: number
  updatedAt: string
  createdAt: string
}
type TotalRewardListType = {
  activeRewardList: RewardInterface[]
  inActiveRewardList: RewardInterface[]
}
export interface RewardType {
  totalRewardList: TotalRewardListType
  isLoading: boolean
}

class Rewards implements RewardType {
  @observable totalRewardList: TotalRewardListType = {
    activeRewardList: [],
    inActiveRewardList: [],
  }
  @observable isLoading: boolean = false
  constructor(private rootStore: MobxStore) {
    makeAutoObservable(this)
  }

  @action
  setRewardList = (activeRewards: any, inActiveRewards: any) => {
    this.totalRewardList = {
      activeRewardList: activeRewards,
      inActiveRewardList: inActiveRewards,
    }
    return this.totalRewardList
  }
  @action
  setInActiveRewardList = (inActiveRewardData: any) => {
    this.totalRewardList.inActiveRewardList = inActiveRewardData
    return this.totalRewardList.inActiveRewardList
  }
  @action
  setTotalRewardList = (RewardData: any) => {
    console.log('from RewardList', RewardData)
    // this.setActiveRewardList(RewardData.activeRewardList)
    // this.setInActiveRewardList(RewardData.inActiveRewardList)
    this.totalRewardList = RewardData
    // return this.totalRewardList
  }
  @action
  setLoading = (loading: boolean) => {
    this.isLoading = loading
    return this.isLoading
  }
}
export default Rewards
