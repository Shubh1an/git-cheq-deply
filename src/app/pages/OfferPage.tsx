import React, {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import {PageTitle} from '../../_metronic/layout/core'
type Props = {}
const OfferPage: FC = () => {
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
          <h1>Offer List</h1>
        </div>
        <div>
          <button className='btn btn-primary me-4 px-6' onClick={() => navigate('create-offer')}>
            Create New Offer
          </button>
        </div>
      </div>
      <div className='row mt-3'>
        <table className='table align-middle gs-0 gy-5 '>
          {/* begin::Table head */}
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
                Offer Name
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-150px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Reward Points
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-140px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Event Trigger
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Enable Attribute
              </th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody style={{textAlign: 'center'}} className='mt-4'>
            {[1, 2, 3, 4]?.map((item) => (
              <tr className=''>
                <td>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    Event 1
                    {/* <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' /> */}
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    Attribute 1{' '}
                    {/* <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' /> */}
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    true{' '}
                    {/* <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' /> */}
                  </span>
                </td>
                <td className=''>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    Code{' '}
                    {/* <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' /> */}
                  </span>
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
const OfferPageWrapper = (props: Props) => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Offer Page</PageTitle>
      <OfferPage />
    </>
  )
}

export default OfferPageWrapper
