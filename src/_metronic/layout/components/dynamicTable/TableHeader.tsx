import React, {FC, useState} from 'react'

interface HeaderProps {
  headers: string[]
  onSorting: any
}
const TableHeader: FC<HeaderProps> = ({headers, onSorting}) => {
  const [sortingField, setSortingField] = useState('')
  const [sortingOrder, setSortingOrder] = useState('asc')

  //   const onSortingChange = (field) => {
  //     const order = field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc'

  //     setSortingField(field)
  //     setSortingOrder(order)
  //     onSorting(field, order)
  //   }

  return (
    <thead
      style={{
        background: '#F3F6F9',
        height: '3rem',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderRadius: '6px',
      }}
    >
      <tr>
        {headers?.map((name) => (
          //   <th key={name} onClick={() => (sortable ? onSortingChange(field) : null)}>
          <th className='p-0 w-180px text-dark fw-bold text-hover-primary mb-3 fs-6' key={name}>
            {name}

            {/* {sortingField &&
              sortingField === field &&
              (sortingOrder === 'asc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />)} */}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
