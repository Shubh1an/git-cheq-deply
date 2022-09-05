import clsx from 'clsx'
import {FieldArray, useFormik, Form, Field, FormikProvider, useFormikContext} from 'formik'
import React, {FC, useEffect, useLayoutEffect, useState} from 'react'

import * as Yup from 'yup'
import {SketchPicker} from 'react-color'
// import 'react-color-gradient-picker/dist/index.css'

import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'

import {GradientCard} from '../../../_metronic/helpers/components/GradientCard'
import {FieldArrayNew} from '../../../_metronic/helpers/components/FieldArray'
import Loader from '../../../_metronic/loader/loader'
import {MobxStore} from '../../../mobx'
import Bank from '../../../services/Bank'
import Voucher from '../../../services/Voucher'
import BrandVoucher from '../../../services/BrandVoucher'
import {observer} from 'mobx-react'
import Select from 'react-select'
interface updateVoucherProps {
  id?: string
}
const CreateBrandVoucher: FC<updateVoucherProps> = observer(({id}) => {
  const {brandVoucherStore} = MobxStore.getInstance()
  const navigate = useNavigate()
  const [topDealImg, setTopDealImg] = useState('')
  const [topDealImgPath, settopDealImgPath] = useState('')
  const [voucherMaster, setVoucherMaster] = useState<any>({
    id: '',
    value: '',
    label: '',
  })
  const [otherOfferImg, setOtherOfferImg] = useState('')
  const [otherOfferImgPath, setOtherOfferImgPath] = useState('')
  const [brandvoucherData, setBrandVoucherData] = useState<any>({})

  const params: any = useParams()
  const {voucherStore} = MobxStore.getInstance()
  const {voucherCategoryList} = voucherStore
  console.log('from brand vouchers vouchers list', voucherCategoryList)
  const getVoucherById = async (id: any) => {
    try {
      if (id) {
        const resp: any = await BrandVoucher.getBrandVoucherById(id)
        console.log(resp)
        if (resp) {
          setBrandVoucherData(resp)
          settopDealImgPath(resp?.bgImgTopDeal)
          setOtherOfferImgPath(resp?.bgImgOtherOffer)
          setVoucherMaster({
            ...voucherMaster,
            value: resp?.categoryMasterId,
            id: resp?.categoryMasterId,
            name: resp?.name,
          })
        }
      }
      Voucher.getVoucherCategoryList()
    } catch (err) {
      toast.error('something went wrong')
      console.log(err)
    }
  }
  useEffect(() => {
    getVoucherById(params?.id)
    return () => {
      Voucher.clearVoucherCategoryList()
    }
  }, [])

  const initialValues = {
    name: brandvoucherData ? brandvoucherData?.name : '',
  }
  const VoucherSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: VoucherSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      console.log('submited', values)
      try {
        if (params.id) {
          const resp1 = await BrandVoucher.updateBrandVouchers(
            params.id,
            {name: values.name, categoryMasterId: voucherMaster?.id},
            topDealImg,
            otherOfferImg
          )
        } else {
          if (voucherMaster.id) {
            const resp1 = await BrandVoucher.createBrandVoucherCategoryList(
              {name: values.name, categoryMasterId: voucherMaster?.id},
              topDealImg,
              otherOfferImg
            )
          } else {
            return toast.error('Please Select Category')
          }
        }
        navigate('/brand-voucher-category')
      } catch (error: any) {
        toast.error(error.message)
        console.error(error)
      } finally {
        setSubmitting(true)

        // cancel(true)
      }
    },
  })
  console.log('aliasss', formik.initialValues, formik.getFieldProps('name'))

  return (
    <>
      <Loader isLoading={brandVoucherStore.isLoading} />
      <div className='w-100 d-flex justify-content-center align-items-center mx-auto ms-5 '>
        <form
          className='form w-75 '
          onSubmit={formik.handleSubmit}
          noValidate
          id='kt_login_signin_form'
        >
          <div
            style={{background: '#ffff'}}
            className='rounded-2 d-flex flex-column border border-1 px-5 py-5'
          >
            <div className=''>
              <div style={{marginLeft: '1.8%', marginRight: '1.8%'}}>
                <div className='row align-items-center justify-content-start'>
                  <div
                    style={{
                      position: 'relative',
                      width: 'fit-content',
                      marginBlock: '20px',
                      marginInline: '10px',
                    }}
                    className='postiton-relative px-auto py-3 col-md-2'
                  >
                    <input
                      className='topDealImg'
                      type='file'
                      hidden
                      onChange={(e: any) => {
                        settopDealImgPath(window.URL.createObjectURL(e?.target?.files?.[0]))
                        setTopDealImg(e?.target.files[0])
                      }}
                    />
                    <div
                      onClick={() => {
                        let event: any = document.getElementsByClassName('topDealImg')[0]
                        event?.click()
                      }}
                      style={{width: '70px', height: '70px', padding: topDealImg ? 0 : '9px 12px'}}
                      className={`${
                        !topDealImgPath && 'rounded-circle border border-1 cursor-pointer'
                      }`}
                    >
                      <img
                        src={
                          topDealImgPath
                            ? topDealImgPath
                            : 'https://storage.googleapis.com/cheq-dev/banklogo/627cca5ed3ad85abe7c527e2-banklogo-1655726558703.png'
                        }
                        style={{width: '100%', height: '100%', objectFit: 'contain'}}
                      />
                    </div>
                    {!topDealImgPath && (
                      <i
                        style={{
                          position: 'absolute',
                          top: '50px',
                          right: '28px',
                          fontSize: '20px',
                          color: '#000',
                        }}
                        className='fa-solid fa-circle-plus positon-absolute bottom-10'
                      ></i>
                    )}
                    <p className='mb-2 fw-bold'>Top Deal</p>
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      width: 'fit-content',
                      marginBlock: '20px',
                      marginInline: '10px',
                    }}
                    className='postiton-relative px-auto py-3 col-md-2'
                  >
                    <input
                      className='otherOffersImg'
                      type='file'
                      hidden
                      onChange={(e: any) => {
                        setOtherOfferImgPath(window.URL.createObjectURL(e?.target?.files?.[0]))
                        setOtherOfferImg(e?.target.files[0])
                      }}
                    />
                    <div
                      onClick={() => {
                        let event: any = document.getElementsByClassName('otherOffersImg')[0]
                        event?.click()
                      }}
                      style={{
                        width: '70px',
                        height: '70px',
                        padding: otherOfferImg ? 0 : '9px 12px',
                      }}
                      className={`${
                        !otherOfferImgPath && 'rounded-circle border border-1 cursor-pointer'
                      }`}
                    >
                      <img
                        src={
                          otherOfferImgPath
                            ? otherOfferImgPath
                            : 'https://storage.googleapis.com/cheq-dev/banklogo/627cca5ed3ad85abe7c527e2-banklogo-1655726558703.png'
                        }
                        style={{width: '100%', height: '100%', objectFit: 'contain'}}
                      />
                    </div>
                    {!otherOfferImgPath && (
                      <i
                        style={{
                          position: 'absolute',
                          top: '50px',
                          right: '28px',
                          fontSize: '20px',
                          color: '#000',
                        }}
                        className='fa-solid fa-circle-plus positon-absolute bottom-10'
                      ></i>
                    )}
                    <p className='mb-2 fw-bold'>Other Offers</p>
                  </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <div
                    style={{marginTop: '2rem'}}
                    className=' align-items-center justify-content-start  row'
                  >
                    <div className='py-3 col-md-4'>
                      <p className='mb-2 fw-bold'>Brand Voucher Category Name</p>
                      <input
                        {...formik.getFieldProps('name')}
                        name='name'
                        className={clsx(
                          'w-100 py-2 form-control form-control-lg form-control-solid mt-3',
                          {
                            'is-invalid': formik.touched.name && formik.errors.name,
                          },
                          {
                            'is-valid': formik.touched.name && !formik.errors.name,
                          }
                        )}
                        type='text'
                        placeholder='Brand Voucher Category Name'
                      />
                    </div>
                  </div>
                  <div className='py-3 col-md-4'>
                    <p className='mb-2 fw-bold'>Category</p>
                    <Select
                      isSearchable
                      onChange={(value: any) => {
                        setVoucherMaster({...value})
                      }}
                      placeholder={voucherMaster.label}
                      value={voucherMaster}
                      options={voucherCategoryList.map((o: any, i: any) => {
                        return {id: o._id, value: o._id, label: o.name}
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{marginBlock: '3rem 2rem'}}
              className='w-100 d-flex align-items-center justify-content-end'
            >
              <button style={{marginRight: '1.8rem'}} type='submit' className='btn btn-primary'>
                {params.id ? 'Update Voucher' : 'Create Voucher'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
})

export default CreateBrandVoucher
