import clsx from 'clsx'
import {FieldArray, useFormik, Form, Field, FormikProvider, useFormikContext} from 'formik'
import React, {FC, useEffect, useLayoutEffect, useState} from 'react'
import * as Yup from 'yup'
import {SketchPicker} from 'react-color'
// import 'react-color-gradient-picker/dist/index.css'

import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {
  addBankMaster,
  getAllBankByRank,
  getBankDetails,
  uploadBankMasterLogo,
} from '../../modules/BankMaster/core/requests'
import {GradientCard} from '../../../_metronic/helpers/components/GradientCard'
import {FieldArrayNew} from '../../../_metronic/helpers/components/FieldArray'
import Loader from '../../../_metronic/loader/loader'
import {MobxStore} from '../../../mobx'
import Bank from '../../../services/Bank'

const AddBankModal = () => {
  const navigate = useNavigate()
  const [img, setImg] = useState('')
  const [imgPath, setImagePath] = useState('')
  const [imgWithName, setImgWithName] = useState('')
  const [imgWithNamePath, setImageWithNamePath] = useState('')
  const [rank, setRank] = useState('')
  const [active, setActive] = useState<boolean>(true)
  const [banksByRank, setBanksbyRank] = useState<any>([])
  const [loading, setLoading] = useState(false)
  // const {addNewBank} = MobxStore.getInstance()
  const [outerGridGradientColors, setOuterGridGradientColors] = useState<any>([
    {color: '', gradientPosition: 'Start'},
    {color: '', gradientPosition: 'Middle'},
    {color: '', gradientPosition: 'End'},
  ])
  const [innerGridGradientColors, setInnerGridGradientColors] = useState<any>([
    {color: '', gradientPosition: 'Start'},
    {color: '', gradientPosition: 'Middle'},
    {color: '', gradientPosition: 'End'},
  ])
  const initialValues = {
    originalBankName: '',
    bureauBankName: '',
    logo: null,
    IFSC_Prefix: '',
    logoWithName: null,
    isActive: true,
    outerGridGradientColors: {
      gOne: outerGridGradientColors[0],
      gTwo: outerGridGradientColors[1],
      gThree: outerGridGradientColors[2],
    },
    innerGridGradientColors: {
      gOne: '#000',
      gTwo: '#000',
      gThree: '#000',
    },
    alias: [''],
    rank: '',
  }
  const BankMasterSchema = Yup.object().shape({
    originalBankName: Yup.string().required('Bank name is required'),
    bureauBankName: Yup.string().required('Bureau name is required'),
    IFSC_Prefix: Yup.string().required('ifsc is required'),
    // outerGridGradientColors: Yup.object().shape({
    //   gOne: Yup.string().required('Color is required'),
    //   gTwo: Yup.string().required('Color is required'),
    //   gThree: Yup.string().required('Color is required'),
    // }),
    // innerGridGradientColors: Yup.object().shape({
    //   gOne: Yup.string().required('Color is required'),
    //   gTwo: Yup.string().required('Color is required'),
    //   gThree: Yup.string().required('Color is required'),
    // }),
  })


  
  const formik = useFormik({
    initialValues,
    validationSchema: BankMasterSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      console.log('submited', values)
      try {
        const resp1 = await Bank.addBank(
          values.originalBankName,
          values.bureauBankName,
          img,
          values.IFSC_Prefix,
          imgWithName,
          (values.outerGridGradientColors = {
            gOne: outerGridGradientColors[0].color,
            gTwo: outerGridGradientColors[1].color,
            gThree: outerGridGradientColors[2].color,
          }),
          (values.innerGridGradientColors = {
            gOne: innerGridGradientColors[0].color,
            gTwo: innerGridGradientColors[1].color,
            gThree: innerGridGradientColors[2].color,
          }),
          values.alias,
          img,
          imgPath,
          imgWithName,
          imgWithNamePath
        )
        console.log(resp1)
        navigate(`/bankmaster`)
      } catch (error) {
        toast.error('something went wrong')
        console.error(error)
      } finally {
        setSubmitting(true)

        // cancel(true)
      }
    },
  })
  console.log('aliasss', formik.values.alias)
  const handleOuterColorChange = (hex: any, key: any) => {
    console.log('hex', hex, key)
    let OuterColorData = [...outerGridGradientColors]
    if (OuterColorData) {
      OuterColorData[key].color = hex

      setOuterGridGradientColors(OuterColorData)
    }
  }
  const handleInnerColorChange = (hex: any, key: any) => {
    console.log('from inner', hex)
    let InnerColorData = [...innerGridGradientColors]
    if (InnerColorData) {
      InnerColorData[key].color = hex

      setInnerGridGradientColors(InnerColorData)
    }
  }
  const handleremove = (ind: any) => {
    console.log('removeINDEX', ind, formik.values.alias)
    formik.setValues({
      ...formik.values,
      alias: formik.values.alias.filter((item: any, index: any) => {
        console.log('from filter', ind, index)
        return index !== ind
      }),
    })
  }
  const handleCheck = (e?: React.ChangeEvent<HTMLInputElement> | undefined) => {
    setActive(!active)
  }
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
            <div
              style={{width: '20%', borderRadius: '5px', alignSelf: 'flex-end'}}
              className='form-check form-switch d-flex align-items-center justify-content-end px-2 ms-auto me-0 py-3'
            >
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                checked={active}
                onChange={handleCheck}
                id='active_checkbox'
              />
            </div>
            <div className=''>
              <div style={{marginLeft: '1.8%', marginRight: '1.8%'}}>
                <div className='row align-items-center justify-content-start'>
                  <div
                    style={{
                      position: 'relative',
                      width: 'fit-content',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    className='postiton-relative px-auto py-3  col-md-2'
                  >
                    <input
                      className='bankLogo'
                      type='file'
                      hidden
                      onChange={(e: any) => {
                        setImagePath(window.URL.createObjectURL(e?.target?.files?.[0]))
                        setImg(e?.target?.files[0])
                      }}
                    />
                    <div
                      onClick={() => {
                        let event: any = document.getElementsByClassName('bankLogo')[0]
                        event?.click()
                      }}
                      style={{width: '70px', height: '70px', padding: imgPath ? 0 : '9px 12px'}}
                      className={`${!imgPath && 'rounded-circle border border-2'} cursor-pointer`}
                    >
                      {imgPath ? (
                        <img
                          src={imgPath}
                          style={{width: '100%', height: '100%', objectFit: 'cover'}}
                          alt='bankLogo'
                        />
                      ) : (
                        <i className='fa-solid fa-building-columns' style={{fontSize: '40px'}}></i>
                      )}
                    </div>
                    {!imgPath && (
                      <i
                        style={{
                          position: 'absolute',
                          top: '42px',
                          left: '55px',
                          fontSize: '20px',
                          color: '#000',
                        }}
                        className='fa-solid fa-circle-plus positon-absolute bottom-10'
                      ></i>
                    )}
                    <p className='mb-2 fw-bold'>Bank Logo</p>
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      width: 'fit-content',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: '2rem',
                    }}
                    className='postiton-relative px-auto py-3  col-md-2'
                  >
                    <input
                      className='bankLogoWithName'
                      type='file'
                      hidden
                      onChange={(e: any) => {
                        setImageWithNamePath(window.URL.createObjectURL(e?.target?.files?.[0]))
                        setImgWithName(e?.target?.files[0])
                      }}
                    />
                    <div
                      onClick={() => {
                        let event: any = document.getElementsByClassName('bankLogoWithName')[0]
                        event?.click()
                      }}
                      style={{
                        width: imgWithNamePath ? '100px' : '70px',
                        height: '70px',
                        padding: imgPath ? 0 : '9px 12px',
                      }}
                      className={`${!imgPath && 'rounded-circle border border-2'} cursor-pointer`}
                    >
                      {imgWithNamePath ? (
                        <img
                          src={imgWithNamePath}
                          style={{width: '100%', height: '100%', objectFit: 'cover'}}
                          alt='bankLogo'
                        />
                      ) : (
                        <i className='fa-solid fa-building-columns' style={{fontSize: '40px'}}></i>
                      )}
                    </div>
                    {!imgWithNamePath && (
                      <i
                        style={{
                          position: 'absolute',
                          top: '42px',
                          left: '75px',
                          fontSize: '20px',
                          color: '#000',
                        }}
                        className='fa-solid fa-circle-plus positon-absolute bottom-10'
                      ></i>
                    )}
                    <p className='mb-2 fw-bold'>Bank Logo Name</p>
                  </div>
                  {/* <div className='col-md-8 ms-5 d-flex justify-content-end'>
                    <div className='py-3 w-25'>
                      <p className='mb-2 fw-bold'>Rank</p>
                      <input
                        {...formik.getFieldProps('rank')}
                        onChange={(e) => handleRank(e)}
                        name='rank'
                        value={rank}
                        className={clsx(
                          'w-100 py-2 form-control form-control-lg form-control-solid mt-3',
                          {
                            'is-invalid': formik.touched.rank && formik.errors.rank,
                          },
                          {
                            'is-valid': formik.touched.rank && !formik.errors.rank,
                          }
                        )}
                        type='text'
                        placeholder='Rank'
                      />
                      <p className='text-danger mt-1 ms-1'>Rank already exist!</p>
                    </div>
                  </div> */}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <div
                    style={{marginTop: '2rem'}}
                    className=' align-items-center justify-content-start  row'
                  >
                    <div className='py-3 col-md-4'>
                      <p className='mb-2 fw-bold'>Bank Name</p>
                      <input
                        {...formik.getFieldProps('originalBankName')}
                        name='originalBankName'
                        className={clsx(
                          'w-100 py-2 form-control form-control-lg form-control-solid mt-3',
                          {
                            'is-invalid':
                              formik.touched.originalBankName && formik.errors.originalBankName,
                          },
                          {
                            'is-valid':
                              formik.touched.originalBankName && !formik.errors.originalBankName,
                          }
                        )}
                        type='text'
                        placeholder='Bank Name'
                      />
                    </div>
                    <div className='py-3 col-md-4'>
                      <p className='mb-2 fw-bold'>Bureau Bank name</p>
                      <input
                        {...formik.getFieldProps('bureauBankName')}
                        name='bureauBankName'
                        className={clsx(
                          'w-100 py-2 form-control form-control-lg form-control-solid mt-3',
                          {
                            'is-invalid':
                              formik.touched.bureauBankName && formik.errors.bureauBankName,
                          },
                          {
                            'is-valid':
                              formik.touched.bureauBankName && !formik.errors.bureauBankName,
                          }
                        )}
                        type='text'
                        placeholder='Bureau Bank Name'
                      />
                    </div>

                    <div className='py-3 col-md-4'>
                      <p className='mb-2 fw-bold'>IFSC Code</p>
                      <input
                        {...formik.getFieldProps('IFSC_Prefix')}
                        name='IFSC_Prefix'
                        className={clsx(
                          'w-100 py-2 form-control form-control-lg form-control-solid mt-3',
                          {
                            'is-invalid': formik.touched.IFSC_Prefix && formik.errors.IFSC_Prefix,
                          },
                          {
                            'is-valid': formik.touched.IFSC_Prefix && !formik.errors.IFSC_Prefix,
                          }
                        )}
                        type='text'
                        placeholder='IFSC code'
                      />
                    </div>
                  </div>

                  <div
                    style={{marginBlock: '2rem'}}
                    className='d-inline-flex align-items-center justify-content-start w-100'
                  >
                    <div className='py-3  w-100'>
                      <p className='mb-2 fw-bold'>Outer Gradient</p>

                      <div
                        className='row'
                        style={{
                          // display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          // gap: '3rem',
                          marginTop: '0.8rem',
                        }}
                      >
                        {outerGridGradientColors.map((color: any, index: any) => (
                          <GradientCard
                            color={color}
                            index={index}
                            formik={formik}
                            outerGridGradientColors={outerGridGradientColors}
                            handleColorChange={handleOuterColorChange}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='d-inline-flex align-items-center justify-content-start w-100'>
                    <div className='py-3  w-100'>
                      <p className='mb-2 fw-bold'>Inner Gradient</p>

                      <div
                        className='row'
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          // gap: '3rem',
                          marginTop: '0.8rem',
                        }}
                      >
                        {innerGridGradientColors.map((color: any, index: any) => (
                          <GradientCard
                            color={color}
                            index={index}
                            formik={formik}
                            handleColorChange={handleInnerColorChange}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='py-3 mt-3 w-100'>
                    <p className='mb-2 fw-bold'> Bank Alias</p>
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
                    {/* <FormikProvider value={formik}>
                      <FieldArray name='alias' component={FieldArrayNew} />
                    </FormikProvider> */}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{marginBlock: '3rem 2rem'}}
              className='w-100 d-flex align-items-center justify-content-end'
            >
              <button style={{marginRight: '1.8rem'}} type='submit' className='btn btn-primary'>
                Create Bank
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddBankModal
