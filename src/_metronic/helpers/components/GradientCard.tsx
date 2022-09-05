import clsx from 'clsx'
import React, {useState} from 'react'
import {SketchPicker} from 'react-color'

type Props = {}

export const GradientCard = ({
  color,
  index,
  formik,
  outerGridGradientColors,
  handleColorChange,
}: any) => {
  console.log(outerGridGradientColors)
  return (
    <div
      style={{
        display: 'block',
        textAlign: 'center',
        position: 'relative',
        // width: '34%',
        // flex: '1',
      }}
      className='col-md-4'
    >
      <div
        className='border border-2 d-flex '
        style={{
          marginInline: 'auto',
          borderRadius: '10px',
          // width: `20.5rem`,
        }}
      >
        <div
          style={{display: 'flex', width: '100%'}}
          className='input-group d-flex align-items-center justify-content-start'
        >
          <div className='custom-file' style={{width: '80%'}}>
            <input
              type='text'
              onChange={(e) => handleColorChange(e.target.value, index)}
              className='form-control form-control-solid w-100'
              id='inputGroupFile02'
              placeholder={color?.gradientPosition}
              value={color.color && color.color}
            />
          </div>

          <div
            className={'border border-1 px-5 py-5 m-auto'}
            style={{
              backgroundColor: color.color
                ? color.color.includes('#')
                  ? color.color
                  : `${'#'.concat(color.color)}`
                : '',
              borderRadius: '8px',
            }}
          ></div>
        </div>
      </div>

      {/* <p className='mb-2 fw-light'>{color?.gradientPosition}</p> */}
    </div>
  )
}
