import React from 'react';
import { Button } from 'semantic-ui-react';

const Paginate = ({page, next, prev}) => (
  <div className="pagination">
    <Button disabled={page===1} onClick={prev} color='blue'>Previus</Button>
    <Button disabled={page===3} onClick={next} color='blue'>Next</Button>
  </div>
)

export default Paginate
