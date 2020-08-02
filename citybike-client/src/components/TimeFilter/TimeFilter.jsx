import React from 'react';
import { Card } from 'reactstrap';

// Custom components:
import Checkbox from './Checkbox';
import TimeSlider from './TimeSlider';

// Custom styles:
import { cardStyle, containerStyle, timeSelectorContainer } from './styles';

class TimeFilter extends React.Component {

    constructor() {
        super();

        this.state = {
            dropdownIsOpen: false,
        };
    }

    render() {
        return (
            <div style={{ ...containerStyle }}>
                <Card style={{ ...cardStyle }}>
                    <Checkbox
                        checked={this.props.showBefore !== undefined}
                        onCheck={() => {
                            if (this.state.dropdownIsOpen) {
                                this.props.updateShowBefore(undefined);
                            }

                            this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen });
                        }} />

                    <div style={{ ...timeSelectorContainer, display: ((this.state.dropdownIsOpen) ? 'flex' : 'none') }}>
                        <p className="text small" style={{ marginBottom: 0, textAlign: 'center' }}>
                            ¿How many minutes ago?
                        </p>
                        <TimeSlider
                            onConfirm={(newDate) => { this.props.updateShowBefore(newDate); }} />
                    </div>

                </Card>
            </div>
        );
    }
}

export default TimeFilter;