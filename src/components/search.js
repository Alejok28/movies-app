import React from 'react';
import { Input } from 'semantic-ui-react'

const Search = ({value, handleChange}) => (
	<div className='search-container'>
		 <Input placeholder='Search' icon='search' value={value} onChange={handleChange}/>
	</div>
)

export default Search;
