import React from 'react'
import { Pagination } from 'semantic-ui-react'

const Paginate = ({onPageChange, activePage}) => (
  <Pagination
    activePage={activePage}
    onPageChange={onPageChange}
    size='mini'
    totalPages={5}
  />
)

export default Paginate
