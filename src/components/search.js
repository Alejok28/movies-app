import React from 'react';
import { Input } from 'semantic-ui-react'

const Search = ({value, handleChange}) => (
	<div className='search-container'>
		<h3>Buscar:</h3>
		 <Input placeholder='Título' value={value} onChange={handleChange}/>
	</div>
)

export default Search;
