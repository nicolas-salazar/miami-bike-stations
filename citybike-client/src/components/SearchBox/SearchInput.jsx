import React from 'react';
import { Input } from 'reactstrap';

const SearchInput = (props) => {
    return (
        <Input
            className='text'
            onBlur={props.onBlur}
            onChange={(e) => { props.onChange(e.target.value); }}
            onFocus={props.onFocus}
            placeholder='Search station'
            style={props.style}
            value={props.value}
        />
    );
}

export default SearchInput;