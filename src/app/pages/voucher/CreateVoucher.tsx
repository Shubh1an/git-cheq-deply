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
interface updateVoucherProps {
  id?: string
}
const CreateVoucher: FC<updateVoucherProps> = ({id}) => {
  const navigate = useNavigate()
  const [img, setImg] = useState('')
  const [imgPath, setImagePath] = useState('')
  const [voucherData, setVoucherData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const params: any = useParams()
  const getVoucherById = async (id: any) => {
    try {
      const resp: any = await Voucher.getVoucherById(id)
      console.log(resp)
      if (resp) {
        setVoucherData(resp)
        setImagePath(resp.bgImg)
      }
    } catch (err) {
      toast.error('something went wrong')
      console.log(err)
    }
  }
  useLayoutEffect(() => {
    if (params?.id) {
      getVoucherById(params?.id)
    }
  }, [])

  const initialValues = {
    name: voucherData ? voucherData?.name : '',
    alias: voucherData ? voucherData?.alias : [''],
  }
  const VoucherSchema = Yup.object().shape({
    name: Yup.string().required('Voucher name is required'),
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
          const resp1 = await Voucher.updateVouchers(
            params.id,
            {name: values.name, alias: values.alias},
            img
          )
        } else {
          const resp1 = await Voucher.createVoucherCategoryList(
            {name: values.name, alias: values.alias},
            img
          )
        }
        navigate('/voucher-category')
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
      <Loader isLoading={loading} />
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
                      className='bankLogo'
                      type='file'
                      hidden
                      onChange={(e: any) => {
                        setImagePath(window.URL.createObjectURL(e?.target?.files?.[0]))
                        setImg(e?.target.files[0])
                      }}
                    />
                    <div
                      onClick={() => {
                        let event: any = document.getElementsByClassName('bankLogo')[0]
                        event?.click()
                      }}
                      style={{width: '70px', height: '70px', padding: img ? 0 : '9px 12px'}}
                      className={`${!imgPath && 'rounded-circle border border-1 cursor-pointer'}`}
                    >
                      <img
                        src={
                          imgPath
                            ? imgPath
                            : 'https://storage.googleapis.com/cheq-dev/banklogo/627cca5ed3ad85abe7c527e2-banklogo-1655726558703.png'
                        }
                        style={{width: '100%', height: '100%', objectFit: 'contain'}}
                      />
                    </div>
                    {!imgPath && (
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
                    <p className='mb-2 fw-bold'>Voucher Logo</p>
                  </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <div
                    style={{marginTop: '2rem'}}
                    className=' align-items-center justify-content-start  row'
                  >
                    <div className='py-3 col-md-4'>
                      <p className='mb-2 fw-bold'>Voucher Category Name</p>
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
                        placeholder='Voucher Category Name'
                      />
                    </div>
                  </div>

                  <div className='py-3 mt-3 w-100'>
                    <p className='mb-2 fw-bold'> Voucher Alias</p>
                    <FormikProvider value={formik}>
                      <FieldArray
                        name='alias'
                        render={(arrayHelpers) => (
                          <div>
                            {formik.values.alias && formik.values.alias.length > 0 ? (
                              formik.values.alias.map((alias: any, index: any) => (
                                <div key={index}>
                                  <div className='row align-items-center my-2'>
                                    <div className='col-md-11'>
                                      <input
                                        {...formik.getFieldProps(`alias.${index}`)}
                                        name={`alias.${index}`}
                                        placeholder='alias'
                                        className={
                                          'w-100  py-2 form-control form-control-lg form-control-solid mt-3'
                                        }
                                      />
                                    </div>
                                    <div className='col-md-1 mt-4'>
                                      {index !== 0 && (
                                        <i
                                          onClick={() => arrayHelpers.remove(index)}
                                          className='fa-solid fa-trash-can text-danger cursor-pointer fs-2'
                                        ></i>
                                      )}
                                    </div>
                                  </div>
                                  {index === formik.values.alias.length - 1 && (
                                    <span
                                      onClick={() => arrayHelpers.push('')}
                                      className='d-flex align-items-center text-primary fs-6 cursor-pointer'
                                    >
                                      <i className='fa-solid fa-circle-plus fs-2 me-2 text-primary'></i>
                                      Add new alias
                                    </span>
                                  )}
                                </div>
                              ))
                            ) : (
                              <button type='button' onClick={() => arrayHelpers.push('')}>
                                Add a friend
                              </button>
                            )}
                          </div>
                        )}
                      />
                    </FormikProvider>
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
}

export default CreateVoucher
