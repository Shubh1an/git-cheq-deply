/* eslint-disable jsx-a11y/anchor-is-valid */
import {observer} from 'mobx-react-lite'
import moment from 'moment'
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {MobxStore} from '../../../mobx'
import Bank from '../../../services/Bank'
import Voucher from '../../../services/Voucher'
import DeleteModal from '../../../_metronic/helpers/components/DeleteModal'
import {PageTitle} from '../../../_metronic/layout/core'
import Loader from '../../../_metronic/loader/loader'

type Props = {
  voucherCategoryList: any
  getVoucherCategoryList: any
}

const VoucherCategoryListWrapper: FC<Props> = ({voucherCategoryList, getVoucherCategoryList}) => {
  const navigate = useNavigate()
  const [showDelete, setShowDelete] = useState(false)
  const [id, setId] = useState<any>()
  console.log({voucherCategoryList})

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
      {showDelete && (
        <DeleteModal
          id={id}
          show={showDelete}
          setShow={setShowDelete}
          setId={setId}
          handleDelete={Voucher.removeVoucherCategoryList}
          title='voucher'
        />
      )}
      {/* begin::Row */}
      <div className='d-flex justify-content-between gy-5 g-xl-8'>
        <div>
          <h1> Voucher Category List</h1>
        </div>
        <div>
          <button className='btn btn-primary me-4 px-6' onClick={() => navigate('create-voucher')}>
            Create Voucher
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
                Voucher Logo
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-150px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Category Name
              </th>

              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-150px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Alias
              </th>

              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-150px  fw-bold text-hover-primary mb-3 fs-6'
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
            {voucherCategoryList?.map((item: any) => (
              <tr>
                <td>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {/* {item?.logo} */}
                    {item?.bgImg ? (
                      <img
                        src={
                          item?.bgImg
                            ? item.bgImg
                            : 'https://storage.googleapis.com/cheq-dev/banklogo/62ac13ec22a8ff1f90f565c6-banklogo-1655726558716.png'
                        }
                        width={50}
                      />
                    ) : (
                      '-'
                    )}
                    {/* <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' /> */}
                  </span>
                </td>

                <td>
                  <div>{item?.name}</div>
                </td>
                <td>
                  {item?.alias?.map((alia: string) => (
                    <div>{alia},</div>
                  ))}
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

                <td className=''>
                  <button
                    className='btn btn-secondary me-2 px-4'
                    // onClick={() => navigate(`/bankmaster/view/${item?.originalBankName}`)}
                    onClick={() => navigate(`update-voucher/${item?._id}`)}
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
const VoucherCategoryWrapper: FC = observer(() => {
  const intl = useIntl()
  const [BankDetails, setBankDetails] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const {voucherStore} = MobxStore.getInstance()

  const getVoucherCategoryList = async () => {
    try {
      Voucher.getVoucherCategoryList()
    } catch (err) {
      toast.error('something went wrong')
    }
  }

  useEffect(() => {
    getVoucherCategoryList()
    return () => {
      Voucher.clearVoucherCategoryList()
    }
  }, [])
  return (
    <>
      <Loader isLoading={voucherStore.isLoading} />
      <PageTitle breadcrumbs={[]}>Voucher Category List </PageTitle>
      <VoucherCategoryListWrapper
        voucherCategoryList={voucherStore.voucherCategoryList}
        getVoucherCategoryList={getVoucherCategoryList}
      />
    </>
  )
})

export default VoucherCategoryWrapper
