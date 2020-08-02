import React from 'react';
import { Input } from 'reactstrap';

class TimeSlider extends React.Component {

    constructor() {
        super();

        this.state = {
            targetDate: new Date(),
            selectedMinutes: 1,
        }
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                    <Input
                        max={10}
                        min={0}
                        step={1}
                        onChange={(e) => { this.setState({ selectedMinutes: e.target.value }); }}
                        onMouseUp={(e) => {
                            this.setState({ selectedMinutes: e.target.value }, () => {
                                this.props.onConfirm(this.getTargetDate());
                            });
                        }}
                        type='range'
                        value={this.state.selectedMinutes} />

                    <span
                        className='text-muted small'
                        style={{ marginTop: 2.5 }}>

                        <b>{this.state.selectedMinutes + ' min '}</b>
                        {this.getTimeStamp()}
                    </span>
                </div>
            </React.Fragment>
        );
    }

    getTargetDate = () => {
        let date = new Date();
        return new Date(date - this.state.selectedMinutes * 1000 * 60);
    }

    getTimeStamp = () => {
        const date = this.getTargetDate();
        return '(' + (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours())
            + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + ')';
    }
}

export default TimeSlider;