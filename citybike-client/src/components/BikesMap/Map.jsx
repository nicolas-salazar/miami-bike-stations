import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

// Map styles:
import { MapConfig } from '../../utils/mapConfig';

class BikesMap extends React.Component {

    constructor() {
        super();

        this.state = {
            lat: 25.790654,
            lng: -80.1300455,
            zoom: 11
        }
    }

    render() {
        return (
            <Map
                center={[this.state.lat, this.state.lng]}
                className='main-container'
                zoom={this.state.zoom}>
                <TileLayer
                    attribution={MapConfig.attribution}
                    url={MapConfig.tileLayerUrl}
                />
            </Map>
        );
    }
}

export default BikesMap;