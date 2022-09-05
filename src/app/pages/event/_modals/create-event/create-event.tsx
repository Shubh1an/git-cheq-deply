/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../../../_metronic/layout/core'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import Select from 'react-select'
import clsx from 'clsx'
import {createEvent, getEventCode} from '../../../../modules/event/core/_requests'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Loader from '../../../../../_metronic/loader/loader'

const options = [
  {value: 'user', label: 'User'},
  {value: 'product', label: 'Product'},
]

const CreateEvent: FC = () => {
  const [data, setData] = useState<any>({})
  const [attr, setAttr] = useState<any>([])
  const [eventCode, setEventCode] = useState<any>({})
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const getEventsCode = async () => {
    try {
      setLoading(true)
      const res = await getEventCode()
      setLoading(false)
      setEventCode(res?.data?.data?.responseData)
    } catch (err) {
      setLoading(false)
      toast.error('something went wrong')
      console.log({err})
    }
  }

  useEffect(() => {
    getEventsCode()
  }, [])

  // const formik = useFormik<IProfileDetails>({
  //   validationSchema: profileDetailsSchema,
  //   onSubmit: (values) => {
  //     setLoading(true)
  //     setTimeout(() => {
  //       values.communications.email = data.communications.email
  //       values.communications.phone = data.communications.phone
  //       values.allowMarketing = data.allowMarketing
  //       const updatedData = Object.assign(data, values)
  //       setData(updatedData)
  //       setLoading(false)
  //     }, 1000)
  //   },
  // })

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required('Event name is required'),
    code: Yup.string().required('Event code is required'),
    // attr: Yup.string().required('Attribute is required'),
    // eventAvl: Yup.string().required('required'),
  })

  const formik = useFormik({
    initialValues: {
      eventName: '',
      code: '',
      eventAvl: '',
      attr: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (attr.length) {
          setLoading(true)
          const newAtr = attr.map((item: any) => item?.value)
          await createEvent(
            values?.eventName,
            values?.code,
            values?.eventAvl ? true : false,
            newAtr
          )
          setLoading(false)
          navigate('/event')
        }
      } catch (ex) {
        setLoading(false)
        console.error(ex)
        toast.error('something went wrong')
      } finally {
        setLoading(false)
        setSubmitting(true)
        // cancel(true)
      }
    },
  })

  return (
    <div className='w-75 mx-auto'>
      <Loader isLoading={loading}/>
      {/* begin::Row */}
      <form onSubmit={formik.handleSubmit} noValidate className='form'>
        <div className='mb-10'>
          <label className='required form-label'>Event Name</label>
          <input
            {...formik.getFieldProps('eventName')}
            name='eventName'
            type='text'
            className={clsx(
              'form-control  ',
              {'is-invalid': formik.touched.eventName && formik.errors.eventName},
              {
                'is-valid': formik.touched.eventName && !formik.errors.eventName,
              }
            )}
            placeholder='name'
          />
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Event Code</label>

          <select
            {...formik.getFieldProps('code')}
            name='code'
            className={clsx(
              'form-control  ',
              {'is-invalid': formik.touched.code && formik.errors.code},
              {
                'is-valid': formik.touched.code && !formik.errors.attr,
              }
            )}
            aria-label='Select...'
          >
            <option>Select...</option>
            {Object.keys(eventCode)?.map((key: any) => (
              <option value={eventCode[key]}>{eventCode[key]}</option>
            ))}
          </select>
        </div>
        <div className='mt-7 mb-10 form-check form-switch d-flex align-items-center justify-content-between px-4 border border-1 bg-white rounded-1 w-100 py-3'>
          <label
            className=' required form-label form-check-label mb-2 fw-bold mt-1'
            htmlFor='flexSwitchCheckDefault'
          >
            Life Time Once
          </label>
          <input
            type='checkbox'
            {...formik.getFieldProps('eventAvl')}
            name='eventAvl'
            className={clsx(
              'form-check-input w-45px h-30px form-control  ',
              {'is-invalid': formik.touched.eventAvl && formik.errors.eventAvl},
              {
                'is-valid': formik.touched.eventAvl && !formik.errors.eventAvl,
              }
            )}
            role='switch'
            id='flexSwitchCheckDefault'
          />
        </div>

        <div className='mb-10'>
          <label className='required form-label'>Attributes</label>
          <Select
            onChange={(e) => setAttr(e)}
            value={attr}
            className={clsx(
              'form-control  ',
              {'is-invalid': !attr?.length && formik.errors.code},
              {
                'is-valid': attr?.length && !formik.errors.code,
              }
            )}
            name='attr'
            options={options}
            isMulti
          />

          {/* <select
            {...formik.getFieldProps('attr')}
            name='attr'
            className={clsx(
              'form-control  ',
              {'is-invalid': formik.touched.attr && formik.errors.attr},
              {
                'is-valid': formik.touched.attr && !formik.errors.attr,
              }
            )}
            aria-label='Select example'
          >
            <option>Select Attributes...</option>
            <option value='1'>One</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </select> */}
        </div>

        <div className='card-footer d-flex justify-content-end py-6 px-9'>
          <button type='submit' className='btn btn-primary' disabled={loading}>
            {!loading && 'Create Event'}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

const CreateEventWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle>Create Event</PageTitle>
      <CreateEvent />
    </>
  )
}

export default CreateEventWrapper
