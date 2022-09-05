/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from 'moment'
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import DeleteModal from '../../../_metronic/helpers/components/DeleteModal'
import {PageTitle} from '../../../_metronic/layout/core'
import Loader from '../../../_metronic/loader/loader'
import {MobxStore} from '../../../mobx'
import Bank from '../../../services/Bank'
import {observer} from 'mobx-react'
import Rewards from '../../../services/Rewards'
import DragList from './DragList'

const RewardPage: FC = observer(() => {
  const {rewardStore} = MobxStore.getInstance()
  const {totalRewardList} = rewardStore
  return (
    <div
      style={{
        paddingInline: '41px',
        paddingInlineStart: '3.7rem',
        background: '#fff',
        border: '1px solid #f5f8fa',
        paddingBlock: '30px',
      }}
      className='rounded-4'
    >
      {/* begin::Row */}
      <div className='d-flex justify-content-between flex-column gy-5 g-xl-8'>
        <div>
          <h1> Rewards</h1>
        </div>
        <DragList />
      </div>
      <div
        style={{marginBlock: '3rem 2rem'}}
        className='w-100 d-flex align-items-center justify-content-end'
      >
        <button
          style={{marginRight: '1.8rem'}}
          onClick={() => Rewards.updateRewardList(totalRewardList)}
          className='btn btn-primary'
        >
          Update
        </button>
      </div>
    </div>
  )
})
const RewardsWrapper: FC = observer(() => {
  const intl = useIntl()
  const [show, setShow] = useState(false)
  const {rewardStore} = MobxStore.getInstance()

  const getRewardsDetails = async () => {
    try {
      await Rewards.getRewardList()
    } catch (err) {
      toast.error('something went wrong')
      console.log(err)
    }
    setShow(true)
  }

  useEffect(() => {
    getRewardsDetails()
    return () => {
      Bank.clearBankList()
    }
  }, [])
  if (!show) return <Loader isLoading={rewardStore.isLoading} />
  return (
    <>
      <Loader isLoading={rewardStore.isLoading} />
      <PageTitle breadcrumbs={[]}>Rewards</PageTitle>
      <RewardPage />
    </>
  )
})

export default RewardsWrapper
