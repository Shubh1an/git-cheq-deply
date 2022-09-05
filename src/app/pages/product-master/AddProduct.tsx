/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import Select from 'react-select'
import clsx from 'clsx'
import {useNavigate} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {toast} from 'react-toastify'
import {getBankMasterData} from '../../modules/BankMaster/core/requests'
import Loader from '../../../_metronic/loader/loader'
import Bank from '../../../services/Bank'
import {MobxStore} from '../../../mobx'
import Product from '../../../services/Product'

const AddProduct: FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {bankStore} = MobxStore.getInstance()
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

  const validationSchema = Yup.object().shape({
    bankName: Yup.string().required('Bank name is required'),
    productName: Yup.string().required('Product name is required'),
  })

  const formik = useFormik({
    initialValues: {
      bankName: '',
      productName: '',
      preNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
       const resp= await Product.createProduct( {originalBankName: values?.bankName,
        productName: values?.productName,
        cardPrefixNumber: values?.preNumber ? values?.preNumber : '',})

        navigate('/productmaster')
      } catch (error) {
       console.log(error)
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
      <Loader isLoading={loading} />
      {/* begin::Row */}
      <form onSubmit={formik.handleSubmit} noValidate className='form'>
        <div className='mb-10'>
          <label className='required form-label'>Product Name</label>
          <input
            {...formik.getFieldProps('productName')}
            name='productName'
            type='text'
            className={clsx(
              'form-control  ',
              {'is-invalid': formik.touched.productName && formik.errors.productName},
              {
                'is-valid': formik.touched.productName && !formik.errors.productName,
              }
            )}
            placeholder='Product Name'
          />
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Bank Name</label>

          <select
            {...formik.getFieldProps('bankName')}
            name='bankName'
            className={clsx(
              'form-control  ',
              {'is-invalid': formik.touched.bankName && formik.errors.bankName},
              {
                'is-valid': formik.touched.bankName && !formik.errors.bankName,
              }
            )}
            aria-label='Select Bank...'
          >
            <option>Select Bank...</option>
            {bankStore.bankList?.map((item: any) => (
              <option key={item?._id} value={item?.originalBankName}>
                {item?.originalBankName}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-10'>
          <label className=' form-label'>Card Prefix Number</label>
          <input
            {...formik.getFieldProps('preNumber')}
            name='preNumber'
            type='text'
            className={clsx(
              'form-control  ',
              {'is-invalid': formik.touched.preNumber && formik.errors.preNumber},
              {
                'is-valid': formik.touched.preNumber && !formik.errors.preNumber,
              }
            )}
            placeholder='Card Prefix Number'
          />
        </div>

        <div className='card-footer d-flex justify-content-end py-6 px-9'>
          <button type='submit' className='btn btn-primary' disabled={loading}>
            {!loading && 'Create Product'}
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

const AddProductWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle>Add Product</PageTitle>
      <AddProduct />
    </>
  )
}

export default AddProductWrapper
