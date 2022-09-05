/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'

import * as Yup from 'yup'
import {FieldArray, FormikProvider, useFormik} from 'formik'
import clsx from 'clsx'
import {
  getAllBankByRank,
  getBankDetails,
  updateBankByRank,
  updateBankMaster,
  uploadBankMasterLogo,
} from '../../modules/BankMaster/core/requests'
import {GradientCard} from '../../../_metronic/helpers/components/GradientCard'
import Loader from '../../../_metronic/loader/loader'
import Bank from '../../../services/Bank'

type Props = {}

const UpdateBankMasterWrapper = (props: Props) => {
  const [BankDetail, setBankDetails] = useState<any>()
  const [logo, setLogo] = useState<any>()
  const [logoImage, setLogoImage] = useState<any>()
  const [imgWithName, setImgWithName] = useState('')
  const [imgWithNamePath, setImageWithNamePath] = useState('')
  const [active, setActive] = useState<boolean>(false)
  const [rank, setRank] = useState('')
  const [banksByRank, setBanksbyRank] = useState<any>([])
  const [rankExist, setRankExist] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [outerGradient, setOuterGradient] = useState<any>([
    {color: '', colorPickerShow: false, gradientPosition: 'Start'},
    {color: '', colorPickerShow: false, gradientPosition: 'Middle'},
    {color: '', colorPickerShow: false, gradientPosition: 'End'},
  ])
  const [innerGradient, setInnerGradient] = useState<any>([
    {color: '', colorPickerShow: false, gradientPosition: 'Start'},
    {color: '', colorPickerShow: false, gradientPosition: 'Middle'},
    {color: '', colorPickerShow: false, gradientPosition: 'End'},
  ])
  const params: any = useParams()
  const navigate = useNavigate()
  const BankDetails = async () => {
    try {
      const res = await getBankDetails(params?.id)
      //   setProduct(res?.data?.data)
      console.log(res?.data?.data?.data)
      setLogo(res?.data?.data?.data?.logo)
      setImageWithNamePath(res?.data?.data?.data?.logoWithName)
      setActive(res?.data?.data?.data?.isActive)
      setBankDetails(res?.data?.data?.data)
      setRank(res?.data?.data?.data?.rank)
      const OuterGradients = res?.data?.data?.data?.outerGridGradientColors
      const InnerGradients = res?.data?.data?.data?.innerGridGradientColors
      setOuterGradient([
        {...outerGradient?.[0], color: OuterGradients?.gOne},
        {...outerGradient?.[1], color: OuterGradients?.gTwo},
        {...outerGradient?.[2], color: OuterGradients?.gThree},
      ])
      setInnerGradient([
        {...innerGradient?.[0], color: InnerGradients?.gOne},
        {...innerGradient?.[1], color: InnerGradients?.gTwo},
        {...innerGradient?.[2], color: InnerGradients?.gThree},
      ])
    } catch (err) {
      toast.error('Something went wrong')
    }
  }
  const BankRankDetails = async () => {
    try {
      const resp = await getAllBankByRank()
      console.log('rank-bank', resp)
      let RankList = []
      for (let item of resp?.data?.data) {
        RankList.push(item?.rank)
      }
      setBanksbyRank([...RankList])
    } catch (err) {
      toast.error('Something went wrong')
    }
  }
  useLayoutEffect(() => {
    BankDetails()
    BankRankDetails()
  }, [])

  const initialValues = {
    originalBankName: BankDetail?.originalBankName,
    bureauBankName: BankDetail?.bureauBankName,
    logo: BankDetail?.logo,
    active: BankDetail?.isActive,
    logoWithName: BankDetail?.logoWithName,
    IFSC_Prefix: BankDetail?.IFSC_Prefix,
    outerGridGradientColors: {
      gOne: '#000',
      gTwo: '#000',
      gThree: '#000',
    },
    innerGridGradientColors: {
      gOne: '#000',
      gTwo: '#000',
      gThree: '#000',
    },
    alias: BankDetail?.alias.length > 0 ? BankDetail?.alias : [''],
    rank: rank ? rank : '',
  }
  const handlBankMasterLogo = async () => {
    try {
      const formData: any = new FormData()

      formData.append('banklogo', logoImage)
      formData.append('bankLogoWithName', imgWithName)
      formData.append('bankMasterId', BankDetail._id)
      await uploadBankMasterLogo(formData)
      navigate('/bankmaster')
    } catch (err) {
      toast.error('something went wrong')
    }
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
    rank: Yup.string().max(2, 'Enter a valid rank'),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: BankMasterSchema,
    // onSubmit: async (values, {setSubmitting}) => {
    //   setSubmitting(true)
    //   setLoading(true)

    //   try {
    //     if (rankExist) return toast.error('rank is already exist')

    //     if (rank !== BankDetail?.rank) {
    //       await updateBankByRank(BankDetail?._id, rank)
    //     }
    //     const resp = await updateBankMaster(
    //       BankDetail._id,

    //       values?.originalBankName,
    //       values?.bureauBankName,
    //       values?.IFSC_Prefix,
    //       logo,
    //       imgWithName,
    //       active,
    //       values?.alias,
    //       (values.outerGridGradientColors = {
    //         gOne: outerGradient[0].color,
    //         gTwo: outerGradient[1].color,
    //         gThree: outerGradient[2].color,
    //       }),
    //       (values.innerGridGradientColors = {
    //         gOne: innerGradient[0].color,
    //         gTwo: innerGradient[1].color,
    //         gThree: innerGradient[2].color,
    //       })
    //     )
    //     if (logoImage) await handlBankMasterLogo()
    //     setLoading(false)

    //     toast.success('succesfully updated')
    //     navigate('/bankmaster')
    //   } catch (ex) {
    //     setLoading(false)

    //     console.error(ex)
    //     toast.error('Something went wrong')
    //   } finally {
    //     setLoading(false)

    //     setSubmitting(true)
    //     // cancel(true)
    //   }
    // },
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      console.log('submited', values)
      try {
        const resp1 = await Bank.updateBankMaster(
          BankDetail._id,
          values?.originalBankName,
          values?.bureauBankName,
          values?.IFSC_Prefix,
          active,
          values?.alias,
          (values.outerGridGradientColors = {
            gOne: outerGradient[0].color,
            gTwo: outerGradient[1].color,
            gThree: outerGradient[2].color,
          }),
          (values.innerGridGradientColors = {
            gOne: innerGradient[0].color,
            gTwo: innerGradient[1].color,
            gThree: innerGradient[2].color,
          }),
          logoImage,
          imgWithName
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
  const handleOuterColorChange = (hex: any, key: any) => {
    console.log(hex, key)
    let OuterColorData = [...outerGradient]
    if (OuterColorData) {
      OuterColorData[key].color = hex
      OuterColorData[key].colorPickerShow = false
      setOuterGradient(OuterColorData)
    }
  }
  const handleInnerColorChange = (hex: any, key: any) => {
    let InnerColorData = [...innerGradient]
    if (InnerColorData) {
      InnerColorData[key].color = hex
      InnerColorData[key].colorPickerShow = false
      setInnerGradient(InnerColorData)
    }
  }
  const showOuterColorBox = (key: any) => {
    let OuterColorData = [...outerGradient]
    if (OuterColorData) {
      OuterColorData[key].colorPickerShow = !OuterColorData[key].colorPickerShow
      setOuterGradient(OuterColorData)
    }
  }
  const showInnerColorBox = (key: any) => {
    let InnerColorData = [...innerGradient]
    if (InnerColorData) {
      InnerColorData[key].colorPickerShow = !InnerColorData[key].colorPickerShow
      setInnerGradient(InnerColorData)
    }
  }
  const handleCheck = (e?: any) => {
    console.log(e)
    setActive(!active)
  }
  const handleRank = async (e: any) => {
    setRank(e.target.value)
    console.log(banksByRank)
    if (parseInt(e?.target?.value) != BankDetail?.rank) {
      setRankExist(banksByRank.includes(parseInt(e?.target?.value)))
    } else {
      console.log('rank triggerd')
      setRankExist(false)
    }

    // if (updatedRank) {

    //   if (banksByRank.includes(parseInt(updatedRank))) {
    //     console.log('true')
    //     return setRankExist(true)
    //   }
    //   const resp = await updateBankByRank(BankDetail?._id, updatedRank)
    //   if (resp && resp?.data?.data?.data?.message == 'Success') {
    //     setRankExist(false)
    //     setRank(updatedRank)
    //   }
    //   console.log(resp, banksByRank)
    // }
    // console.log(banksByRank)
  }
  return (
    <div className='w-100 d-flex justify-content-center align-items-center mx-auto ms-5'>
      <Loader isLoading={loading} />
      <form className='form w-75' onSubmit={formik.handleSubmit} noValidate id='form'>
        <div
          style={{background: '#ffff'}}
          className='rounded-2 d-flex flex-column border border-1 px-5 py-5'
        >
          <div className='row d-flex justify-content-between align-items-center'>
            <div className='col-md-8'>
              <div className='py-3'>
                {/* <p className='mb-2 fw-bold'>Bank Name</p> */}
                <div className='fs-2 fw-bold'>{BankDetail?.originalBankName}</div>
              </div>
            </div>
            <div
              style={{width: '20%', borderRadius: '5px', alignSelf: 'flex-end'}}
              className='form-check form-switch d-flex align-items-center justify-content-end px-2 ms-auto me-0 py-3 col-md-2'
            >
              {/* <label className='form-check-label mb-2 fw-bold' htmlFor='event_checkbox'>
              Active
            </label> */}
              <input
                {...formik.getFieldProps(active)}
                className='form-check-input'
                type='checkbox'
                role='switch'
                checked={active}
                // value={active}
                onChange={(e) => handleCheck(e)}
                id='active_checkbox'
              />
            </div>
          </div>
          <div style={{marginLeft: '1.8%', marginRight: '1.8%'}}>
            <div
              style={{gap: '0.75rem'}}
              className='d-flex align-items-center justify-content-start row'
            >
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
                    setLogo(window.URL.createObjectURL(e?.target?.files?.[0]))
                    setLogoImage(e?.target.files[0])
                  }}
                />
                <div
                  onClick={() => {
                    let event: any = document.getElementsByClassName('bankLogo')[0]
                    event?.click()
                  }}
                  style={{width: '70px', height: '70px', padding: logoImage ? 0 : '9px 12px'}}
                  className={`${!logo && 'rounded-circle border border-1 cursor-pointer'}`}
                >
                  <img
                    src={
                      logo
                        ? logo
                        : 'https://storage.googleapis.com/cheq-dev/banklogo/627cca5ed3ad85abe7c527e2-banklogo-1655726558703.png'
                    }
                    style={{width: '100%', height: '100%', objectFit: 'contain'}}
                  />
                </div>
                {!logo && (
                  <i
                    style={{
                      position: 'absolute',
                      top: '50px',
                      right: '8px',
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
                className='postiton-relative px-auto py-3 col-md-2'
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
                    padding: imgWithNamePath ? 0 : '9px 12px',
                  }}
                  className={`${
                    !imgWithNamePath && 'rounded-circle border border-2'
                  } cursor-pointer`}
                >
                  <img
                    src={
                      imgWithNamePath
                        ? imgWithNamePath
                        : 'https://storage.googleapis.com/cheq-dev/banklogo/627cca5ed3ad85abe7c527e2-banklogo-1655726558703.png'
                    }
                    style={{width: '100%', height: '100%', objectFit: 'contain'}}
                    alt='bankLogo'
                  />
                </div>
                {!imgWithNamePath && (
                  <i
                    style={{
                      position: 'absolute',
                      top: '50px',
                      right: '25px',
                      fontSize: '20px',
                      color: '#000',
                    }}
                    className='fa-solid fa-circle-plus positon-absolute bottom-10'
                  ></i>
                )}
                <p className='mb-2 fw-bold'>Bank Logo Name</p>
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <div
                style={{marginTop: '2rem'}}
                className=' align-items-center justify-content-start row'
              >
                <div className='py-3 col-md-4'>
                  <p className='mb-2 fw-bold'>Bureau Bank name</p>
                  <input
                    {...formik.getFieldProps('bureauBankName')}
                    name='bureauBankName'
                    className={clsx(
                      'w-100 py-2 form-control form-control-lg form-control-solid mt-3',
                      {'is-invalid': formik.touched.bureauBankName && formik.errors.bureauBankName},
                      {
                        'is-valid': formik.touched.bureauBankName && !formik.errors.bureauBankName,
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
                    placeholder='Bank Name'
                  />
                </div>
                <div className='col-md-4 d-flex flex-column'>
                  <div className='py-3 w-100'>
                    <p className='mb-2 fw-bold'>Rank</p>
                    <input
                      disabled={!active}
                      {...formik.getFieldProps('rank')}
                      onChange={(e) => handleRank(e)}
                      name='rank'
                      value={rank}
                      className={clsx(
                        'w-100 py-2 form-control form-control-lg form-control-solid mt-3',
                        {
                          'is-invalid': formik.touched.rank && formik.errors.rank && rankExist,
                        },
                        {
                          'is-valid': formik.touched.rank && !formik.errors.rank,
                        }
                      )}
                      type='number'
                      placeholder='Rank'
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-8'></div>
                {rankExist && (
                  <p className='text-danger mt-1 ms-1 d-flex justify-content-start col-md-2'>
                    Rank already exist!
                  </p>
                )}
              </div>

              <div className='d-inline-flex align-items-center justify-content-start w-100'>
                <div className='py-3 w-100'>
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
                    {outerGradient.map((color: any, index: any) => (
                      <GradientCard
                        color={color}
                        index={index}
                        formik={formik}
                        showBox={showOuterColorBox}
                        handleColorChange={handleOuterColorChange}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className='d-inline-flex align-items-center justify-content-start w-100'>
                <div className='py-3 w-100'>
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
                    {innerGradient.map((color: any, index: any) => (
                      <GradientCard
                        color={color}
                        index={index}
                        formik={formik}
                        showBox={showInnerColorBox}
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
                                  className='d-flex align-items-center text-primary fs-6 cursor-pointer'
                                  onClick={() => arrayHelpers.push('')}
                                >
                                  <i className='fa-solid fa-circle-plus fs-2 me-2 text-primary'></i>
                                  Add new alias
                                </span>
                              )}
                            </div>
                          ))
                        ) : (
                          <button
                            className='btn btn-primary'
                            type='button'
                            onClick={() => arrayHelpers.push('')}
                          >
                            Add alias
                          </button>
                        )}
                      </div>
                    )}
                  />
                </FormikProvider>
              </div>
            </div>
          </div>
          <div
            style={{marginBlock: '3rem 2rem'}}
            className='w-100 d-flex align-items-center justify-content-end'
          >
            <button style={{marginRight: '1.8rem'}} type='submit' className='btn btn-primary'>
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateBankMasterWrapper
