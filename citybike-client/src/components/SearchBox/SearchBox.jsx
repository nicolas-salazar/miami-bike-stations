import React from 'react';
import { Card } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Custom components:
import SearchInput from './SearchInput';

// Icons:
import { FaSearchLocation } from 'react-icons/fa';
import { GiBroom } from 'react-icons/gi';
import { SearchResults } from './SearchResults';

// Custom styles:
import { baseBorder, cardStyle, containerStyle, iconContainerStyle, iconStyle, inputContainerStyle, inputStyle, resultsContainer } from './Styles';
import 'react-perfect-scrollbar/dist/css/styles.css';

class SearchBox extends React.Component {

    constructor() {
        super();

        this.state = {
            activeFilter: '',
            dropdownIsOpen: false,
        };
    }

    render() {
        return (
            <div style={{ ...containerStyle }}>
                <Card style={{ ...cardStyle }}>
                    <div style={{ ...inputContainerStyle }}>
                        <div style={{ ...iconContainerStyle, borderRight: baseBorder }}>
                            <FaSearchLocation style={{ ...iconStyle }} />
                        </div>

                        <SearchInput
                            onBlur={() => { setTimeout(() => { this.setState({ dropdownIsOpen: false }); }, 200); }}
                            onChange={(value) => { this.setState({ activeFilter: value, dropdownIsOpen: true }); }}
                            onFocus={() => { this.setState({ dropdownIsOpen: true }); }}
                            style={{ ...inputStyle }}
                            value={this.state.activeFilter} />

                        <div
                            onClick={() => {
                                this.setState({ activeFilter: '' });
                            }}
                            style={{ ...iconContainerStyle, borderLeft: baseBorder }}>
                            <GiBroom className='pushable-button' style={{ ...iconStyle, opacity: 1 }} />
                        </div>
                    </div>

                    <PerfectScrollbar style={{ ...resultsContainer, display: ((this.state.activeFilter !== '' && this.state.dropdownIsOpen) ? 'flex' : 'none') }}>
                        {(this.state.activeFilter !== '' && this.state.dropdownIsOpen) ?
                            <SearchResults
                                filter={this.state.activeFilter}
                                focusOnStation={this.props.focusOnStation}
                                items={this.props.stations} /> :
                            <React.Fragment />}
                    </PerfectScrollbar>
                </Card>
            </div>
        );
    }
}

export default SearchBox;