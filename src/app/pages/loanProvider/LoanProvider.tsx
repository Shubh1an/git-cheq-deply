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
import Loan from '../../../services/Loan'
import DynTable from '../../../_metronic/layout/components/dynamicTable/DynTable'
import PaginationComponent from '../../../_metronic/layout/components/dynamicTable/Pagination'

type Props = {
  event: any
}

const LoanProviderPage: FC<Props> = observer(({event}) => {
  const {loanProv} = MobxStore.getInstance()
  const {itemPerPage, currentPage, totalListLength, loanList} = loanProv
  const headers = ['S.No', 'Logo', 'Biller Name', 'Biller Id', 'Category', 'Status', 'FlowType']
  return (
    // <div
    //   style={{
    //     paddingInline: '41px',
    //     paddingInlineStart: '3.7rem',
    //     background: '#fff',
    //     border: '1px solid #f5f8fa',
    //     paddingBlock: '30px',
    //   }}
    //   className='rounded-4'
    // >
    //   <Loader isLoading={bankStore.isLoading} />
    //   {/* begin::Row */}
    //   <div className='d-flex justify-content-between gy-5 g-xl-8'>
    //     <div>
    //       <h1> Bank Master</h1>
    //     </div>
    //     <div>
    //       <button
    //         className='btn btn-primary me-4 px-6'
    //         onClick={() => navigate('create-bank-master')}
    //       >
    //         Add Bank
    //       </button>
    //     </div>
    //   </div>
    //   <div className='row mt-3'>
    //     <table className='table align-middle gs-0 gy-5 '>
    //       <thead
    //         style={{
    //           background: '#F3F6F9',
    //           height: '3rem',
    //           verticalAlign: 'middle',
    //           textAlign: 'center',
    //           borderRadius: '6px',
    //         }}
    //       >
    //         <tr>
    //           <th className='p-0 w-180px text-dark fw-bold text-hover-primary mb-3 fs-6'>
    //             Bank Logo
    //           </th>
    //           <th
    //             style={{color: '#B5B5C3'}}
    //             className='p-0 min-w-150px  fw-bold text-hover-primary mb-3 fs-6'
    //           >
    //             Ifsc Prefix{' '}
    //           </th>
    //           <th
    //             style={{color: '#B5B5C3'}}
    //             className='p-0 min-w-140px  fw-bold text-hover-primary mb-3 fs-6'
    //           >
    //             Bank Name
    //           </th>
    //           <th
    //             style={{color: '#B5B5C3'}}
    //             className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
    //           >
    //             Bureau Bank Name
    //           </th>
    //           <th
    //             style={{color: '#B5B5C3'}}
    //             className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
    //           >
    //             Status
    //           </th>
    //           <th
    //             style={{color: '#B5B5C3'}}
    //             className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
    //           >
    //             Created At
    //           </th>

    //           <th
    //             style={{color: '#B5B5C3'}}
    //             className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
    //           >
    //             Delete
    //           </th>
    //           <th
    //             style={{color: '#B5B5C3'}}
    //             className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
    //           >
    //             Detail
    //           </th>
    //         </tr>
    //       </thead>

    //       {/* begin::Table body */}
    //       <tbody style={{textAlign: 'center'}} className='mt-4'>
    //         {event?.map((item: any) => (
    //           <tr>
    //             <td>
    //               <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
    //                 {/* {item?.logo} */}
    //                 <img
    //                   src={
    //                     item?.logo
    //                       ? item.logo
    //                       : 'https://storage.googleapis.com/cheq-dev/banklogo/62ac13ec22a8ff1f90f565c6-banklogo-1655726558716.png'
    //                   }
    //                   width={50}
    //                 />
    //               </span>
    //             </td>

    //             <td>
    //               <span className={` text-dark fw-bold text-hover-primary mb-1 fs-6`}>
    //                 {item?.IFSC_Prefix}
    //               </span>
    //             </td>
    //             <td>
    //               <span className={`text-dark fw-bold text-hover-primary mb-1 fs-6`}>
    //                 {item?.originalBankName}
    //               </span>
    //             </td>
    //             <td>
    //               <span className={` text-dark fw-bold text-hover-primary mb-1 fs-6`}>
    //                 {item?.bureauBankName}
    //               </span>
    //             </td>
    //             <td>
    //               <span
    //                 className={`${
    //                   !item?.isActive ? 'text-danger' : 'text-success'
    //                 }    fw-bold text-hover-primary mb-1 fs-6`}
    //               >
    //                 {item?.isActive ? 'Active' : 'Inactive'}
    //               </span>
    //             </td>
    //             <td>
    //               <span className={`text-dark fw-bold text-hover-primary mb-1 fs-6`}>
    //                 {moment(item?.createdAt).format('DD MMM YYYY')}
    //               </span>
    //             </td>
    //             <td>
    //               <DeleteModal handleDelete={Bank.removeBank} id={item?._id} title='bank' />
    //             </td>
    //             <td>
    //               <button
    //                 className='btn btn-secondary me-2 px-4'
    //                 onClick={() => navigate(`view/${item?.originalBankName}`)}
    //               >
    //                 Details
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //       {/* end::Table body */}
    //     </table>
    //   </div>
    // </div>
    <>
      <div
        style={{
          paddingInline: '41px',
          paddingInlineStart: '3.7rem',
          background: '#fff',
          border: '1px solid #f5f8fa',
          paddingBlock: '30px 10px',
        }}
        className='rounded-4'
      >
        <div className='d-flex justify-content-between gy-5 g-xl-8'>
          <div>
            <h1>Loan Provider</h1>
          </div>
        </div>
        <DynTable
          headers={headers}
          itemPerPage={itemPerPage}
          currentPage={currentPage}
          loanList={loanList}
        />
      </div>
      <div style={{marginTop: '3rem'}} className='row justify-content-end'>
        <div className='col-md-8 pe-0 '>
          <PaginationComponent
            total={totalListLength}
            itemsPerPage={itemPerPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  )
})
const LoanProviderWrapper = observer(() => {
  const {loanProv} = MobxStore.getInstance()
  //   console.log({bankStore: bankStore.bankList})
  const [update, setUpdate] = useState(true)
  const getLoanProvider = async (skip: any, take: any) => {
    try {
      const resp = await Loan.getLoanList(skip, take)
      console.log(resp)
    } catch (err) {
      toast.error('something went wrong')
      console.log(err)
    }
    setUpdate(false)
  }

  useEffect(() => {
    getLoanProvider(
      loanProv.currentPage * loanProv.itemPerPage - loanProv.itemPerPage,
      loanProv.itemPerPage
    )
    return () => {
      Bank.clearBankList()
    }
  }, [])
  if (update) return <Loader isLoading={loanProv.isLoading} />
  return (
    <>
      <Loader isLoading={loanProv.isLoading} />
      <PageTitle breadcrumbs={[]}>Loan Provider</PageTitle>
      <LoanProviderPage event={loanProv.loanList} />
    </>
  )
})
export default LoanProviderWrapper
