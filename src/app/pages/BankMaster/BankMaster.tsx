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

type Props = {
  event: any
  getBankDetails: any
}

const EventPage: FC<Props> = ({event, getBankDetails}) => {
  const navigate = useNavigate()
  const {bankStore} = MobxStore.getInstance()
  const [showDelete, setShowDelete] = useState(false)
  const [id, setId] = useState<any>()
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
      {showDelete && (
        <DeleteModal
          id={id}
          show={showDelete}
          setShow={setShowDelete}
          setId={setId}
          handleDelete={Bank.removeBank}
          title='bank'
        />
      )}
      <Loader isLoading={bankStore.isLoading} />
      {/* begin::Row */}
      <div className='d-flex justify-content-between gy-5 g-xl-8'>
        <div>
          <h1> Bank Master</h1>
        </div>
        <div>
          <button
            className='btn btn-primary me-4 px-6'
            onClick={() => navigate('create-bank-master')}
          >
            Add Bank
          </button>
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
                Status
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Created At
              </th>

              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Delete
              </th>
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
              <tr>
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
                  </span>
                </td>

                <td>
                  <span className={` text-dark fw-bold text-hover-primary mb-1 fs-6`}>
                    {item?.IFSC_Prefix}
                  </span>
                </td>
                <td>
                  <span className={`text-dark fw-bold text-hover-primary mb-1 fs-6`}>
                    {item?.originalBankName}
                  </span>
                </td>
                <td>
                  <span className={` text-dark fw-bold text-hover-primary mb-1 fs-6`}>
                    {item?.bureauBankName}
                  </span>
                </td>
                <td>
                  <span
                    className={`${
                      !item?.isActive ? 'text-danger' : 'text-success'
                    }    fw-bold text-hover-primary mb-1 fs-6`}
                  >
                    {item?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <span className={`text-dark fw-bold text-hover-primary mb-1 fs-6`}>
                    {moment(item?.createdAt).format('DD MMM YYYY')}
                  </span>
                </td>
                <td>
                  <span
                    onClick={() => {
                      setId(item._id)
                      setShowDelete(true)
                    }}
                    className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                  >
                    <i className='fa-solid fa-trash-can text-danger cursor-pointer'></i>
                  </span>
                </td>
                <td>
                  <button
                    className='btn btn-secondary me-2 px-4'
                    onClick={() => navigate(`view/${item?.originalBankName}`)}
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
const BankMasterWrapper: FC = observer(() => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const {bankStore} = MobxStore.getInstance()
  console.log({bankStore: bankStore.bankList})

  const getBankDetails = async () => {
    try {
      await Bank.getAllBanks()
    } catch (err) {
      toast.error('something went wrong')
      console.log(err)
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
      <PageTitle breadcrumbs={[]}>Bank Master</PageTitle>
      <EventPage event={bankStore.bankList} getBankDetails={getBankDetails} />
    </>
  )
})

export default BankMasterWrapper
