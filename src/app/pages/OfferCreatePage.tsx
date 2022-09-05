import clsx from 'clsx'
import {table} from 'console'
import {useFormik} from 'formik'
import React, {FC, useState} from 'react'
import * as Yup from 'yup'
import {KTSVG} from '../../_metronic/helpers'
import Select from 'react-select'
import DatePickerLayout from '../../_metronic/layout/components/DateRangePicker/DateRangePicker'
import DateRangePicker2 from '../../_metronic/layout/components/DateRangePicker/DateRangePicker'

// type Props = {}

const OfferCreatePage: FC = () => {
  interface TableProps {
    table1: boolean
    table2: boolean
    table3: boolean
  }

  const TableInitalState = {
    table1: false,
    table2: false,
    table3: false,
  }
  const [showTable, setShowTable] = useState<TableProps>(TableInitalState)
  const [showAttribute, setShowAttribute] = useState<boolean>(false)
  const [switchRewards, setSwitchRewards] = useState<boolean>(false)
  const [showRange, setShowRange] = useState<boolean>(false)
  const [showRewardLimit, setShowRewardLimit] = useState<boolean>(false)
  const [value, setValue] = React.useState<any>([new Date('2017-02-01'), new Date('2017-05-20')])
  const [Event, setEvent] = useState<any>([])
  const initialValues = {
    productname: '',
    internalname: '',
    Eventname: '',
    rewardpoints: '',
    rewardlimit: '',
  }
  const options = [
    {value: 'user', label: 'User'},
    {value: 'product', label: 'Product'},
  ]
  const formSchema = Yup.object().shape({
    productname: Yup.string().required('Username is required'),
    internalname: Yup.string().required('Username is required'),
    Eventname: Yup.string().required('Username is required'),
    rewardpoints: Yup.string().required('Username is required'),
    rewardlimit: Yup.string().required('Username is required'),
    // dateOfBirth: Yup.d
    //   .required('Username is required'),
    condition2: Yup.string().required('Username is required'),
    condition3: Yup.string().required('Username is required'),
  })
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => console.log(values),
  })
  const handleCheck = (e?: React.ChangeEvent<HTMLInputElement> | undefined) => {
    // console.log(e?.target.checked)

    e?.currentTarget.checked && e?.currentTarget.id === 'event_checkbox' && setShowAttribute(true)
    !e?.currentTarget.checked && e?.currentTarget.id === 'event_checkbox' && setShowAttribute(false)
    e?.currentTarget.checked && e?.currentTarget.id === 'date_checkbox' && setShowRange(true)
    !e?.currentTarget.checked && e?.currentTarget.id === 'date_checkbox' && setShowRange(false)
    e?.currentTarget.checked &&
      e?.currentTarget.id === 'actionRewards_checkbox' &&
      setSwitchRewards(true)
    !e?.currentTarget.checked &&
      e?.currentTarget.id === 'actionRewards_checkbox' &&
      setSwitchRewards(false)
    e?.currentTarget.checked &&
      e?.currentTarget.id === 'RewardLimit_checkbox' &&
      setShowRewardLimit(true)
    !e?.currentTarget.checked &&
      e?.currentTarget.id === 'RewardLimit_checkbox' &&
      setShowRewardLimit(false)
  }
  return (
    <div className='row g-6 g-xl-9 mx-auto ms-5'>
      <form
        className='form row g-6 g-xl-9 mx-auto ms-5'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        <div
          style={{background: '#ffff'}}
          className='mx-2 rounded-2 col-xl-3 px-5 py-4 mt-0 border border-1'
        >
          <h3> Offers</h3>
          <div
            style={{overflowY: 'scroll', height: '60vh', paddingLeft: '20px', paddingRight: '20px'}}
          >
            <div className='mt-7'>
              <label className='form-label mb-2 fw-bold'>Campaign Name</label>
              <input
                placeholder='Campaign name'
                {...formik.getFieldProps('productname')}
                className={clsx(
                  'w-100 py-2 form-control form-control-lg form-control-solid mt-3',
                  {'is-invalid': formik.touched.productname && formik.errors.productname},
                  {
                    'is-valid': formik.touched.productname && !formik.errors.productname,
                  }
                )}
                name='productname'
                type='text'
              />
            </div>
            <div className='mt-7'>
              <p className='mb-2 fw-bold'>Internal name</p>
              <input
                name='internalname'
                className={clsx(
                  'w-100 py-2 form-control form-control-lg form-control-solid mt-3',
                  {'is-invalid': formik.touched.internalname && formik.errors.internalname},
                  {
                    'is-valid': formik.touched.internalname && !formik.errors.internalname,
                  }
                )}
                type='text'
                placeholder='internal Name'
              />
            </div>
            <div className='mt-7'>
              <p className='mb-2 fw-bold'>Event</p>
              <div className='w-100 me-5'>
                <Select
                  onChange={(e) => setEvent(e)}
                  value={Event}
                  className={clsx(
                    'form-control  ',
                    {'is-invalid': !Event?.length && formik.errors.Eventname},
                    {
                      'is-valid': Event?.length && !formik.errors.Eventname,
                    }
                  )}
                  placeholder='Select Event'
                  name='Event'
                  options={options}
                  isMulti
                />
              </div>
            </div>
            <div
              style={{marginBlock: '3rem'}}
              className='form-check form-switch d-flex align-items-center justify-content-between px-2 border border-1 w-100 py-3'
            >
              <label className='form-check-label mb-2 fw-bold' htmlFor='event_checkbox'>
                Event Attribute
              </label>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                onChange={handleCheck}
                id='event_checkbox'
              />
            </div>
            {showAttribute && (
              <div
                style={{marginBlock: '3rem'}}
                className='w-100 d-flex align-items-center justify-content-end'
              >
                <button
                  onClick={() => {
                    setShowTable({...showTable, table1: true})
                  }}
                  type='button'
                  className='btn btn-primary ms-auto me-1'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add Attribute
                </button>
              </div>
            )}
            <div
              style={{marginBlock: '3rem'}}
              className='form-check form-switch d-flex align-items-center justify-content-between px-2 border border-1 w-100 py-3'
            >
              <label className='form-check-label mb-2 fw-bold' htmlFor='flexSwitchCheckDefault'>
                Date Range
              </label>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                onChange={handleCheck}
                id='date_checkbox'
              />
            </div>

            {/* <DatePickerLayout/> */}
            {showRange && (
              <div style={{marginBlock: '3rem'}}>
                <DateRangePicker2 />
              </div>
            )}
            <div
              style={{marginBlock: '3rem'}}
              className='form-check form-switch d-flex align-items-center justify-content-between px-2 border border-1 w-100 py-3'
            >
              <p className='form-check-p mb-2 fw-bold'>Condition</p>
              <div style={{transform: 'rotate(45deg)'}}>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              </div>
            </div>
            <div
              style={{marginBlock: '3rem'}}
              className='form-check form-switch d-flex align-items-center justify-content-between px-2 border border-1 w-100 py-3'
            >
              <label className='form-check-label mb-2 fw-bold' htmlFor='flexSwitchCheckDefault'>
                ActionRewardPoints
              </label>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                onChange={handleCheck}
                id='actionRewards_checkbox'
              />
            </div>
            {/* <div className='mt-7'>
              <p className='mb-2 fw-bold'>Internal name</p>
              <input placeholder='50' className='w-100 py-2' type='text' />
            </div> */}
            <div style={{marginBlock: '3rem'}}>
              <label className='form-label mb-2 fw-bold'>
                Reward Points
                {switchRewards ? (
                  <span style={{color: '#D3D3D3'}}>{' (In Percentage)'}</span>
                ) : (
                  <span style={{color: '#D3D3D3'}}>{' (In Numbers) '}</span>
                )}
              </label>
              {switchRewards ? (
                <input
                  placeholder='Reward Points'
                  {...formik.getFieldProps('rewardpoints')}
                  className={clsx(
                    'w-100 py-2 form-control form-control-lg form-control-solid mt-5',
                    {'is-invalid': formik.touched.rewardpoints && formik.errors.rewardpoints},
                    {
                      'is-valid': formik.touched.rewardpoints && !formik.errors.rewardpoints,
                    }
                  )}
                  name='rewardpoints'
                  type='text'
                />
              ) : (
                <input
                  placeholder='Reward Points'
                  {...formik.getFieldProps('rewardpoints')}
                  className={clsx(
                    'w-100 py-2 form-control form-control-lg form-control-solid mt-5',
                    {'is-invalid': formik.touched.rewardpoints && formik.errors.rewardpoints},
                    {
                      'is-valid': formik.touched.rewardpoints && !formik.errors.rewardpoints,
                    }
                  )}
                  name='rewardpoints'
                  type='text'
                />
              )}
            </div>
            <div
              style={{marginBlock: '3rem'}}
              className='form-check form-switch d-flex align-items-center justify-content-between px-2 border border-1 w-100 py-3'
            >
              <label className='form-check-label mb-2 fw-bold' htmlFor='RewardLimit_checkbox'>
                Reward Limit
              </label>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                onChange={handleCheck}
                id='RewardLimit_checkbox'
              />
            </div>
            {showRewardLimit && (
              <input
                placeholder='Reward Limit'
                {...formik.getFieldProps('rewardlimit')}
                className={clsx(
                  'w-100 py-2 form-control form-control-lg form-control-solid mt-3',
                  {'is-invalid': formik.touched.rewardlimit && formik.errors.rewardlimit},
                  {
                    'is-valid': formik.touched.rewardlimit && !formik.errors.rewardlimit,
                  }
                )}
                name='rewardlimit'
                type='text'
              />
            )}
          </div>
          <div className='w-100 d-flex align-items-center justify-content-end mt-4'>
            <button type='submit' className='btn btn-primary'>
              Save
            </button>
          </div>
        </div>

        {showTable.table1 && (
          <div
            style={{background: '#ffff'}}
            className='col-md-6 mx-1 rounded-2 col-xl-2 px-5 py-4 mt-0 border border-1'
          >
            <h3> Tables</h3>
            <div className='d-flex flex-column gy-5 mt-5'>
              <button
                onClick={() => {
                  setShowTable({...showTable, table2: true})
                }}
                type='button'
                className='btn btn-primary py-5 text-center'
              >
                User
              </button>
              <button type='button' className='btn btn-danger py-5 text-center mt-5'>
                Product
              </button>
            </div>
            <div className='w-100 d-flex align-items-center justify-content-end mt-4'>
              <button
                onClick={() => {
                  setShowTable({...showTable, table2: false, table1: false, table3: false})
                }}
                type='button'
                className='btn btn-light px-5'
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {showTable.table1 && showTable.table2 && (
          <div
            style={{background: '#ffff'}}
            className='col-md-6 mx-1 rounded-2 col-xl-3 px-5 py-4 mt-0 border border-1'
          >
            <h3>Attribute</h3>
            <div
              onClick={() => {
                setShowTable({...showTable, table3: true})
              }}
              style={{background: '#F1F1F1', height: '144px'}}
              className='mt-7 fw-bold border border-1 rounded-2 d-flex align-items-start justify-content-center px-5 py-5 h-144px'
            >
              Attribute 1
            </div>
            <div
              style={{background: '#F1F1F1', height: '144px'}}
              className='mt-7 fw-bold border border-1 rounded-2 d-flex align-items-start justify-content-center px-5 py-5 h-144px'
            >
              Attribute 2
            </div>
            <div
              style={{background: '#F1F1F1', height: '144px'}}
              className='mt-7 fw-bold border border-1 rounded-2 d-flex align-items-start justify-content-center px-5 py-5 h-144px'
            >
              Attribute 3
            </div>

            <div className='w-100 d-flex align-items-center justify-content-end mt-4'>
              <button
                type='button'
                onClick={() => {
                  setShowTable({...showTable, table2: false, table3: false})
                }}
                className='btn btn-light px-5'
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {showTable.table1 && showTable.table2 && showTable.table3 && (
          <div
            style={{background: '#ffff'}}
            className='col-md-6 mx-1 rounded-2 col-xl-3 px-5 py-4 mt-0 border border-1'
          >
            <h3>Conditions</h3>
            <div className='mt-7 border border-1 rounded-2 py-5 ps-5 pe-3  '>
              <p className='mb-2 fw-bold'>Date OF Birth</p>

              <input className='w-100 py-2 mt-3' type='date' />
            </div>
            <div className='mt-7 border border-1 rounded-2 py-5 ps-5 pe-3  '>
              <p className='mb-2 fw-bold'>Condition 2</p>

              <input className='w-100 py-2 mt-3' type='date' />
            </div>
            <div className='mt-7 border border-1 rounded-2 py-5 ps-5 pe-3  '>
              <p className='mb-2 fw-bold'>Condition 3</p>

              <input className='w-100 py-2 mt-3' type='date' />
            </div>
            <div className='w-100 d-flex align-items-center justify-content-end mt-4'>
              <button type='button' className='btn btn-primary'>
                Save
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default OfferCreatePage
