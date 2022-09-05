import React, {FC, useEffect, useMemo, useState} from 'react'
import {MobxStore} from '../../../../mobx'
import PaginationComponent from './Pagination'
import Search from './Search'
import TableHeader from './TableHeader'

type tableProps = {
  headers: string[]
  itemPerPage: number
  currentPage: number
  loanList: any[]
}

const DynTable: FC<tableProps> = ({headers, itemPerPage, currentPage, loanList}) => {
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState({field: '', order: ''})

  //   const ITEMS_PER_PAGE = 30

  //   const filtered = useMemo(() => {
  //     let filteredResult = loanList
  //     console.log(filteredResult)
  //     if (search) {
  //       filteredResult = filteredResult.filter((result) =>
  //         result['Country'].toLowerCase().includes(search.toLowerCase())
  //       )
  //     }

  //     if (sorting.field) {
  //       const reversed = sorting.order === 'asc' ? 1 : -1
  //       console.log(results, sorting.field)
  //       const value = results[0][sorting.field]
  //       console.log(typeof value)
  //       if (typeof value === 'string') {
  //         filteredResult = filteredResult.sort(
  //           (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
  //         )
  //       } else {
  //         filteredResult = filteredResult.sort((a, b) =>
  //           sorting.order === 'asc'
  //             ? a[sorting.field] - b[sorting.field]
  //             : b[sorting.field] - a[sorting.field]
  //         )
  //       }
  //     }

  //     return filteredResult
  //   }, [currentPage])
  return (
    <>
      <div style={{background: '#fff'}} className='row w-100 mt-5'>
        <div className='col mb-3 col-12 text-center'>
          {/* <div className='row mt-4 mb-4'>
            <div className='col-md-6  flex-row-reverse '>
              <Search
                onSearch={(value: string) => {
                  setSearch(value)
                  setCurrentPage(1)
                }}
              />
            </div>
          </div> */}

          <>
            <table className='table align-middle gs-0 gy-5 '>
              <TableHeader
                headers={headers}
                onSorting={(field: any, order: any) => setSorting({field, order})}
              />
              <tbody>
                {loanList.map((provider, index) => (
                  <tr key={index}>
                    {/* <td className={classes.textStyle}>{r['Country']}</td>
                      <td>{r['TotalRecovered']}</td>
                    <td>{r['TotalDeaths']}</td> */}
                    <td>{currentPage * itemPerPage - itemPerPage + index + 1}</td>
                    <td>{provider.logo}</td>
                    <td>{provider.billerName}</td>
                    <td>
                      {/* <button className='btn btn-danger' onClick={() => show(r)}>
                          <PieChartIcon />
                        </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div style={{marginTop: '3rem'}} className='row justify-content-end'>
              <div className='col-md-8 pe-0 '>
                <PaginationComponent
                  total={totalListLength}
                  itemsPerPage={itemPerPage}
                  currentPage={currentPage}
                />
              </div>
            </div> */}
          </>
        </div>
      </div>
    </>
  )
}

export default DynTable
