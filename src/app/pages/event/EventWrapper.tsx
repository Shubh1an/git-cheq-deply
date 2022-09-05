/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {PageTitle} from '../../../_metronic/layout/core'
import Loader from '../../../_metronic/loader/loader'
import {
  MixedWidget2,
  MixedWidget10,
  MixedWidget11,
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget5,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
} from '../../../_metronic/partials/widgets'
import {getEvent} from '../../modules/event/core/_requests'

type Props = {
  event: any
}

const EventPage: FC<Props> = ({event}) => {
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
          <h1> Event page</h1>
        </div>
        <div>
          <button className='btn btn-primary me-4 px-6' onClick={() => navigate('create')}>
            Create Event
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
                Event Name
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-150px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Attribute{' '}
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-140px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Life Time
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Event Code
              </th>
            </tr>
          </thead>

          {/* begin::Table body */}
          <tbody style={{textAlign: 'center'}} className='mt-4'>
            {event?.map((item: any) => (
              <tr className=''>
                <td>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {item?.name}
                    {/* <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' /> */}
                  </span>
                </td>
                <td>
                  {item?.availableAttributes?.map((attr: string) => (
                    <span
                      className='text-dark fw-bold text-hover-primary mb-1 fs-6 '
                      style={{marginRight: '4px'}}
                    >
                      {attr},
                      {/* <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' /> */}
                    </span>
                  ))}
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {String(item?.LifeTimeOnce)}
                    {/* <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' /> */}
                  </span>
                </td>
                <td className=''>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {item?.event_name_in_code}
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
const EventWrapper: FC = () => {
  const intl = useIntl()
  const [event, setEvent] = useState<any>([])
  const [loading, setLoading] = useState(false)


  const getEvents = async () => {
    try {
      setLoading(true)
      const res: any = await getEvent()
      setLoading(false)
      setEvent(res?.data?.data?.responseData)
    } catch (err) {
      setLoading(false)
      toast.error('something went wrong')
      console.log(err)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])
  return (
    <>
    <Loader isLoading={loading}/>
      <PageTitle breadcrumbs={[]}>Events</PageTitle>
      <EventPage event={event} />
    </>
  )
}

export default EventWrapper
