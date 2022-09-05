import React from 'react'
import {Formik, Form, Field, FieldArray} from 'formik'
type Props = {}

export const FieldArrayNew = (props: any) => {
  console.log('new-arryaa', props)
  const {push, remove, form, formik} = props
  const {values} = form
  const {alias} = values
  console.log(alias)
  return (
    <div>
      {alias && alias.length > 0 ? (
        alias.map((aliass: any, index: any) => {
          console.log('from map', form.getFieldProps(`aliass.${index}`))

          return (
            <div key={index}>
              <div className='row align-items-center my-2'>
                <div className='col-md-11'>
                  <input
                    {...form.getFieldProps(`aliass.${index}`)}
                    name={`aliass[${index}]`}
                    placeholder='alias'
                    className={'w-100  py-2 form-control form-control-lg form-control-solid mt-3'}
                  />
                </div>
                <div className='col-md-1 mt-4'>
                  {index !== 0 && (
                    <i
                      onClick={() => remove(index)}
                      className='fa-solid fa-trash-can text-danger cursor-pointer fs-2'
                    ></i>
                  )}
                </div>
              </div>
              {index == alias.length - 1 && (
                <span className='d-flex align-items-center text-primary fs-6 cursor-pointer'>
                  <i
                    className='fa-solid fa-circle-plus fs-2 me-2 text-primary'
                    onClick={() => push('')}
                  ></i>
                  Add new alias
                </span>
              )}
            </div>
          )
        })
      ) : (
        <button type='button' onClick={() => push('')}>
          Add a friend
        </button>
      )}
    </div>
  )
}
