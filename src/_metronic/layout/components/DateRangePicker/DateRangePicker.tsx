// import type { RadioChangeEvent } from 'antd';
// import { DatePicker, Radio, Space } from 'antd';
// import type { SizeType } from 'antd/es/config-provider/SizeContext';
// import React, { useState } from 'react';

// const { RangePicker } = DatePicker;

// const DatePickerLayout: React.FC = () => {
//   const [size, setSize] = useState<SizeType>('middle');

//   const handleSizeChange = (e: RadioChangeEvent) => {
//     setSize(e.target.value);
//   };

//   return (
//   <Space direction="vertical" size={12}>
//     <RangePicker />
//     {/* <RangePicker showTime />
//     <RangePicker picker="week" />
//     <RangePicker picker="month" />
//     <RangePicker picker="quarter" />
//     <RangePicker picker="year" /> */}
//   </Space>
//   );
// };

// export default DatePickerLayout;
import {format} from 'date-fns/esm'
import React, {useEffect, useRef, useState} from 'react'
import {DateRangePicker} from 'react-date-range'
import './DateReact.css'
type Props = {}
const selectionRange = {
  startDate: new Date('2017- 02-01'),
  endDate: new Date('2017-05-20'),
  key: 'selection',
}
const DateRangePicker2 = (props: Props) => {
  const [focus, setInputFocus] = useState<Boolean>(false)
  const ref = useRef<any>()
  return (
    <div className='d-flex flex-column align-items-center'>
      <label className='input w-100'>
        <input
          className='input__field'
          type={focus ? 'date' : 'text'}
          placeholder='start-date'
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
        <span className='input__label'>Start Date</span>
      </label>
      <p style={{margin: '0', marginInline: '2px', paddingBlockStart: '5px', marginBlock: '5px'}}>
        to
      </p>
      {/* <input className='w-50 py-2 mt-3' type='date' /> */}
      <label className='input w-100'>
        <input
          className='input__field'
          type={focus ? 'date' : 'text'}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          placeholder='endda'
        />
        <span className='input__label'>End Date</span>
      </label>
    </div>
  )
}

export default DateRangePicker2
