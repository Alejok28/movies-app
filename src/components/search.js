import React from 'react';
import { Input } from 'semantic-ui-react'

const Search = ({value, handleChange, placeholder}) => (
	<div className={`search ${placeholder}`}>
		 <Input placeholder={placeholder} icon='search' value={value} onChange={handleChange}/>
	</div>
)

export default Search;
