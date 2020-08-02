import React from 'react';

// Icons:
import { GrBike } from 'react-icons/gr';
import { MdDoNotDisturbOff } from 'react-icons/md';

// Custom styles:
import { iconContainerStyle, iconStyle, SearchResultContainer } from './styles';

export const SearchResults = (props) => {

    let filteredItems = props.items.filter(item => item.extra.address.toLowerCase().includes(props.filter.toLowerCase()));
    filteredItems = filteredItems.sort((a, b) => (a.extra.address > b.extra.address) ? 1 : -1);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {
                filteredItems.map((item, i) => {
                    return (
                        <SearchResult
                            filter={props.filter}
                            focusOnStation={props.focusOnStation}
                            item={item}
                            key={'searchItem.' + item.id} />
                    );
                })
            }

            {
                ((!filteredItems.length) ? <NoMatchesLabel /> : <React.Fragment />)
            }
        </div>
    );
}

export const SearchResult = (props) => {
    return (
        <div
            className='clickeable-item'
            onClick={() => { props.focusOnStation(props.item); }}
            style={{ ...SearchResultContainer }}>
            <div style={{ ...iconContainerStyle }}>
                {(props.item.free_bikes > 0) ?
                    <GrBike style={{ ...iconStyle, opacity: 0.5, marginBottom: 2.5 }} /> :
                    <MdDoNotDisturbOff style={{ ...iconStyle, opacity: 0.5, marginBottom: 2.5 }} />}
            </div>

            <span className='muted-text'
                dangerouslySetInnerHTML={{
                    __html: props.item.extra.address.toLowerCase().replace(
                        props.filter.toLowerCase(),
                        '<span class="bolded-text">' + props.filter.toLowerCase() + '</span>')
                }} />
        </div>
    );
}

const NoMatchesLabel = (props) => {
    return (
        <div style={{ ...SearchResultContainer, height: 20 }}>
            <span className='muted-text' style={{ width: '100%', textAlign: 'center' }}
                dangerouslySetInnerHTML={{ __html: 'No matches :c' }} />
        </div>
    );
}