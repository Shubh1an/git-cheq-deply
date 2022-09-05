/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import Select from 'react-select'
import clsx from 'clsx'
import {useNavigate, useParams} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'

import {getProductDetails, updateProductById} from '../../modules/product/core/_requests'
import {toast} from 'react-toastify'
import {getBankMasterData} from '../../modules/BankMaster/core/requests'
import Loader from '../../../_metronic/loader/loader'
import Product from '../../../services/Product'
import Bank from '../../../services/Bank'

const UpdateProduct: FC = () => {
  const [data, setData] = useState<any>({})
  const [attr, setAttr] = useState<any>([])
  const [bankList, setBankList] = useState<any>([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const params: any = useParams()
  const [product, setProduct] = useState<any>({})

  const proudctDetails = async () => {
    try {         

      const res = await Product.getProductDetailId(params?.id)
      setProduct(res?.data?.data)
    } catch (err) {
      toast.error('Something went wrong')
    }
  }
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
    proudctDetails()
    return () => {
      Bank.clearBankList()
      Product.clearProductList()
    }
  }, [])


  const validationSchema = Yup.object().shape({
    preNumber: Yup.string().required('Prefix number is required'),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: product?.productName,
      preNumber: product?.cardPrefixNumber,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const res = await Product.updateProductById({
          product_id: params?.id,
          cardPrefixNumber: values?.preNumber ? String(values?.preNumber) : '',
        })
        navigate('/productmaster')
        toast.success('Success')
      } catch (ex) {
        toast.error('something went wrong')
        console.error(ex)
      } finally {
        
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
          <label className='required form-label'>Product Name</label>
          <input
            {...formik.getFieldProps('productName')}
            name='productName'
            type='text'
            className={clsx(
              'form-control  '
              // {'is-invalid': formik.touched.productName && formik.errors.productName},
              // {
              //   'is-valid': formik.touched.productName && !formik.errors.productName,
              // }
            )}
            placeholder='Product Name'
            disabled
          />
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
            {!loading && 'Update Product'}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

const UpdateProductWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle> Product Details</PageTitle>
      <UpdateProduct />
    </>
  )
}

export default UpdateProductWrapper
