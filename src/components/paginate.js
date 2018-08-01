import React from 'react';
import { Pagination } from 'semantic-ui-react';

const Paginate = ({onPageChange, page}) => (
  <Pagination
    activePage={page}
    onPageChange={onPageChange}
    size='mini'
    totalPages={5}
  />
)

export default Paginate
