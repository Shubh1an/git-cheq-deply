import React, {useEffect, useState, useMemo, FC} from 'react'
import Pagination from 'react-bootstrap/Pagination'
import Loan from '../../../../services/Loan'
interface PaginationProps {
  total: number
  itemsPerPage: number
  currentPage: number
  onPageChange?: any
}
const PaginationComponent: FC<PaginationProps> = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0) setTotalPages(Math.ceil(total / itemsPerPage))
  }, [total, itemsPerPage])

  const paginationItems = useMemo(() => {
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => Loan.setPage(i)}>
          {i}
        </Pagination.Item>
      )
    }

    return pages
  }, [totalPages, currentPage, onPageChange])

  if (totalPages === 0) return null

  return (
    <Pagination className='w-100'>
      <Pagination.Prev
        className='fs-1'
        onClick={() => Loan.setPage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <Pagination.Next
        className='fs-1'
        onClick={() => Loan.setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  )
}

export default PaginationComponent
