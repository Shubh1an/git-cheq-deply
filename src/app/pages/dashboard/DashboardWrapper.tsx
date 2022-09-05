/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
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
import {getTotalUsers} from '../../modules/dashboard/core/_requests'

const DashboardPage: FC = () => {
  const [usersData, setUsersData] = useState<any>()
  const getUsers = async () => {
    const resp = await getTotalUsers()
    console.log('dashboard', resp)
    setUsersData(resp?.data)
  }
  useEffect(() => {
    getUsers()
  }, [])
  return (
    <>
      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-4'>
          <MixedWidget2
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='200px'
            strokeColor='#cb1e46'
            usersData={usersData}
          />
        </div>
        <div className='col-xxl-4'>
          <ListsWidget5 className='card-xxl-stretch' />
        </div>
        <div className='col-xxl-4'>
          <MixedWidget10
            className='card-xxl-stretch-50 mb-5 mb-xl-8'
            chartColor='primary'
            chartHeight='150px'
          />
          <MixedWidget11
            className='card-xxl-stretch-50 mb-5 mb-xl-8'
            chartColor='primary'
            chartHeight='175px'
          />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row gy-5 gx-xl-8'>
        <div className='col-xxl-4'>
          <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
        </div>
        <div className='col-xl-8'>
          <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
        <div className='col-xl-4'>
          <ListsWidget2 className='card-xl-stretch mb-xl-8' />
        </div>
        <div className='col-xl-4'>
          <ListsWidget6 className='card-xl-stretch mb-xl-8' />
        </div>
        <div className='col-xl-4'>
          <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
          {/* partials/widgets/lists/_widget-4', 'class' => 'card-xl-stretch mb-5 mb-xl-8', 'items' => '5' */}
        </div>
      </div>
      {/* end::Row */}

      <div className='row g-5 gx-xxl-8'>
        <div className='col-xxl-4'>
          <MixedWidget8
            className='card-xxl-stretch mb-xl-3'
            chartColor='success'
            chartHeight='150px'
          />
        </div>
        <div className='col-xxl-8'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
        </div>
      </div>
    </>
  )
}

const DashboardWrapper: FC = () => {
  const [dummyData, setDummyData] = useState<any>([
    {title: '', users: ''},
    {title: '', users: ''},
    {},
    {},
  ])
  const [usersData, setUsersData] = useState<any>()
  const getUsers = async () => {
    const resp = await getTotalUsers()
    console.log('dashboard', resp)
    setUsersData(resp?.data)
    console.log(resp?.data)
    setDummyData([
      {...dummyData?.[0], title: 'Total Users', users: resp?.data.activeUser},
      {...dummyData?.[1], title: 'Active Users', users: resp?.data.activeUserToday},
      {},
      {},
    ])
  }
  useEffect(() => {
    getUsers()
  }, [])
  console.log(dummyData)
  const intl = useIntl()
  return (
    <>
    <Loader isLoading={false}/>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      {/* <h5>Comming Soon</h5> */}

      <div style={{gap: '1rem'}} className='d-flex flex-row'>
        {dummyData.map((data: any, index: any) => (
          <div className='card card-custom shadow col '>
            <div className='card-header'>
              <div className='d-flex justify-content-start align-items-start mt-2'>
                {index == 0 && (
                  <div style={{backgroundColor: '#add8e6'}} className='px-2 py-2 rounded-circle'>
                    <img
                      src='https://img.icons8.com/fluency/96/000000/conference-call.png'
                      style={{
                        width: '30px',
                        height: '30px',
                        objectFit: 'contain',
                        borderRadius: '50%',
                      }}
                    />
                  </div>
                )}
                {index == 1 && <span className='hint__dot me-2 mt-3'></span>}
                <div
                  className={`d-flex flex-column align-items-start ${
                    index == 1 ? 'ms-1' : 'ms-2'
                  } `}
                >
                  <h3 className='card-title mb-1'>{data.title ? data.title : 'Fluid Image'}</h3>
                  <p className='mt-1'>{data.users ? data.users : ''}</p>
                </div>
              </div>
              <div className='card-toolbar'>
                <button type='button' className='btn btn-sm btn-light'>
                  Action
                </button>
              </div>
            </div>
            <div className='card-body p-0'>
              <div className='card-p'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
              <img
                className='w-100 card-rounded-bottom'
                alt=''
                src='assets/media/svg/illustrations/bg-4.svg'
              />
            </div>
          </div>
        ))}
      </div>
      {/* <DashboardPage /> */}
      <div className='col-xxl-4 mt-5'>
        <MixedWidget2
          className='card-xl-stretch mb-xl-8'
          chartColor='danger'
          chartHeight='200px'
          strokeColor='#cb1e46'
          usersData={usersData}
        />
      </div>
    </>
  )
}

export {DashboardWrapper}
