
import React from 'react';
import { divIcon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

// Custom styles:
import { availabilityText } from './styles';

// Utilities:
import { getRandomItem } from '../../utils/scripts';
import { notManyBikesMessages, enoughBikesMessages, fiveBikesMessages } from './randomMessages';

import L from 'leaflet';
L.Icon.Default.imagePath = '/';

class Station extends React.Component {

    constructor() {
        super();

        this.state = {
            stationRecords: [],
        };
    }

    render() {
        if (this.state.stationRecords.length > 0) {

            const item = this.getLastRecord();

            if (item) {
                const iconMarkup = renderToStaticMarkup(<i className='fa fa-bicycle fa-2x' style={{ color: this.getColorBasedOnAvailability(item) }} />);
                const customMarkerIcon = divIcon({ html: iconMarkup, className: 'marker-on-divicon' });

                return (
                    <Marker
                        icon={customMarkerIcon}
                        position={{ lat: item.latitude, lng: item.longitude }}
                    >
                        <Popup>
                            <span
                                className='text small' style={{ textDecoration: 'underline' }}
                                dangerouslySetInnerHTML={{ __html: '<b>' + item.extra.address + '</b> says:' }} />

                            <p
                                className='text small'
                                dangerouslySetInnerHTML={{ __html: this.getMessageBasedOnAvailability(item) }}
                                style={{ ...availabilityText, marginTop: 5, marginLeft: 10 }} />

                            <span
                                className='muted-text small'
                                dangerouslySetInnerHTML={{ __html: 'Last update: <b>Today, ' + this.getTimeStamp(item) + '</b>' }} />

                        </Popup>
                    </Marker>
                );
            }

            else { return (<React.Fragment />); }
        }
        else { return (<React.Fragment />); }
    }

    componentDidMount() {
        this.setState({
            stationRecords: [
                {
                    ...this.props.item,
                    fetchDate: this.props.lastFetch,
                }
            ]
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.item) !== JSON.stringify(this.props.item)) {
            let stationRecords = [...this.state.stationRecords];

            stationRecords.push({
                ...this.props.item,
                fetchDate: this.props.lastFetch,
            });

            this.setState({ stationRecords: stationRecords });
        }
    }

    // Operative functions:
    getLastRecord = () => {
        let targetItem = undefined;
        let records = [...this.state.stationRecords];

        if (this.props.showBefore) {
            records = records.filter(item => item.fetchDate <= this.props.showBefore);
        }

        if (records.length > 0) {
            records = records.sort((a, b) => (a.fetchDate < b.fetchDate) ? 1 : -1);
            return records[0];
        }

        return targetItem;
    }

    // Rendering functions:
    getColorBasedOnAvailability = (item) => {
        if (item.free_bikes === 0) {
            return 'red';
        }

        if (item.free_bikes < 5) {
            return 'orange';
        }

        return 'green';
    }

    getMessageBasedOnAvailability = (item) => {
        if (item.free_bikes === 0) {
            return '<b>No more bikes</b> available. We are so sorry 🤧';
        }

        if (item.free_bikes < 5) {
            let message = getRandomItem(notManyBikesMessages);
            message = message.replace('@total', item.free_bikes);
            if (item.free_bikes === 1) { message = message.replace('bikes', 'bike'); };

            return message;
        }

        if (item.free_bikes === 5) {
            let message = getRandomItem(fiveBikesMessages);
            return message.replace('@total', item.free_bikes);
        }

        let message = getRandomItem(enoughBikesMessages);
        return message.replace('@total', item.free_bikes);
    }

    getTimeStamp = (item) => {
        const date = new Date(item.timestamp);
        return date.getHours() + ':' + date.getMinutes();
    }
}

export default Station;