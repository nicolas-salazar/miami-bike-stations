
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

        this.state = {};
    }

    render() {
        const iconMarkup = renderToStaticMarkup(<i className='fa fa-bicycle fa-2x' style={{ color: this.getColorBasedOnAvailability() }} />);
        const customMarkerIcon = divIcon({ html: iconMarkup, className: 'marker-on-divicon' });

        return (
            <Marker
                icon={customMarkerIcon}
                position={{ lat: this.props.item.latitude, lng: this.props.item.longitude }}
            >
                <Popup>
                    <span
                        className='text small' style={{ textDecoration: 'underline' }}
                        dangerouslySetInnerHTML={{ __html: '<b>' + this.props.item.extra.address + '</b> says:' }} />

                    <p
                        className='text small'
                        dangerouslySetInnerHTML={{ __html: this.getMessageBasedOnAvailability() }}
                        style={{ ...availabilityText, marginTop: 5, marginLeft: 10 }} />

                    <span
                        className='muted-text small'
                        dangerouslySetInnerHTML={{ __html: 'Last update: <b>Today, ' + this.getTimeStamp() + '</b>' }} />

                </Popup>
            </Marker>
        );
    }

    getColorBasedOnAvailability = () => {
        if (this.props.item.free_bikes === 0) {
            return 'red';
        }

        if (this.props.item.free_bikes < 5) {
            return 'orange';
        }

        return 'green';
    }

    getMessageBasedOnAvailability = () => {
        if (this.props.item.free_bikes === 0) {
            return '<b>No more bikes</b> available. We are so sorry 🤧';
        }

        if (this.props.item.free_bikes < 5) {
            let message = getRandomItem(notManyBikesMessages);
            message = message.replace('@total', this.props.item.free_bikes);
            if (this.props.item.free_bikes === 1) { message = message.replace('bikes', 'bike'); };

            return message;
        }

        if (this.props.item.free_bikes === 5) {
            let message = getRandomItem(enoughBikesMessages);
            return message.replace('@total', this.props.item.free_bikes);
        }


        let message = getRandomItem(fiveBikesMessages);
        return message.replace('@total', this.props.item.free_bikes);
    }

    getTimeStamp = () => {
        const date = new Date(this.props.item.timestamp);
        return date.getHours() + ':' + date.getMinutes();
    }
}

export default Station;