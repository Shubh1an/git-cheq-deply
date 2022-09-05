/* eslint-disable jsx-a11y/anchor-is-valid */
import {observer} from 'mobx-react-lite'
import moment from 'moment'
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {MobxStore} from '../../../mobx'
import Bank from '../../../services/Bank'
import {PageTitle} from '../../../_metronic/layout/core'
import Loader from '../../../_metronic/loader/loader'

type Props = {
  event: any
  getBankDetails: any
}

const TopBanks: FC<Props> = ({event, getBankDetails}) => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        paddingInline: '50px',
        paddingInlineStart: '4.7rem',
        background: '#fff',
        border: '1px solid #f5f8fa',
        paddingBlock: '30px',
      }}
      className='rounded-4'
    >
      {/* begin::Row */}
      <div className='d-flex justify-content-between gy-5 g-xl-8'>
        <div>
          <h1> Top Banks</h1>
        </div>
      </div>
      <div className='row mt-3'>
        <table className='table align-middle gs-0 gy-5 '>
          <thead
            style={{
              background: '#F3F6F9',
              height: '3rem',
              verticalAlign: 'middle',
              textAlign: 'center',
              borderRadius: '6px',
            }}
          >
            <tr>
              <th className='p-0 w-180px text-dark fw-bold text-hover-primary mb-3 fs-6'>Rank</th>
              <th className='p-0 w-180px text-dark fw-bold text-hover-primary mb-3 fs-6'>
                Bank Logo
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-150px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Ifsc Prefix{' '}
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-140px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Bank Name
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Bureau Bank Name
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Created At
              </th>

              {/* <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Delete
              </th> */}
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Detail
              </th>
            </tr>
          </thead>

          {/* begin::Table body */}
          <tbody style={{textAlign: 'center'}} className='mt-4'>
            {event?.map((item: any) => (
              <tr style={{backgroundColor: `${!item?.isActive ? 'red' : ''}`}} className=''>
                <td>
                  <div>{item?.rank}</div>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {/* {item?.logo} */}
                    <img
                      src={
                        item?.logo
                          ? item.logo
                          : 'https://storage.googleapis.com/cheq-dev/banklogo/62ac13ec22a8ff1f90f565c6-banklogo-1655726558716.png'
                      }
                      width={50}
                    />
                    {/* <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' /> */}
                  </span>
                </td>
                {/* <td>
                  {item?.availableAttributes?.map((attr: string) => (
                    <span
                      className='text-dark fw-bold text-hover-primary mb-1 fs-6 '
                      style={{marginRight: '4px'}}
                    >
                      {attr},
                      <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' />
                    </span>
                  ))}
                </td> */}
                <td>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {item?.IFSC_Prefix}
                    {/* <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' /> */}
                  </span>
                </td>
                <td className=''>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {item?.originalBankName}
                  </span>
                </td>
                <td className=''>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {item?.bureauBankName}
                  </span>
                </td>
                <td className=''>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {moment(item?.createdAt).format('DD MMM YYYY')}
                  </span>
                </td>

                <td className=''>
                  <button
                    className='btn btn-secondary me-2 px-4'
                    onClick={() => navigate(`/bankmaster/view/${item?.originalBankName}`)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
    </div>
  )
}
const TopBankMasterWrapper: FC = observer(() => {
  const intl = useIntl()
  const [BankDetails, setBankDetails] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const {bankStore} = MobxStore.getInstance()
  console.log({bankStore})

  const getBankDetails = async () => {
    try {
      Bank.getTopBankList()
    } catch (err) {
      toast.error('something went wrong')
    }
  }

  useEffect(() => {
    getBankDetails()
    return () => {
      Bank.clearBankList()
    }
  }, [])
  return (
    <>
      <Loader isLoading={bankStore.isLoading} />
      <PageTitle breadcrumbs={[]}>Top Banks </PageTitle>
      <TopBanks event={bankStore.bankList} getBankDetails={getBankDetails} />
    </>
  )
})

export default TopBankMasterWrapper
