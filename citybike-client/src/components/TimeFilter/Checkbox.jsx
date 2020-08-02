import React from 'react';
import { Label, Input } from 'reactstrap';

const Checkbox = (props) => {
    return (
        <Label check={props.checked}>
            <Input
                onClick={(e) => { props.onCheck(); }}
                style={{ marginTop: '0.45rem' }}
                type="checkbox" />
            <span className="text">See old records</span>
        </Label>
    );
}

export default Checkbox;