import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

// Map styles:
import { MapConfig } from '../../utils/mapConfig';

class BikesMap extends React.Component {

    constructor() {
        super();

        this.state = {}
    }

    render() {
        return (
            <Map
                center={this.props.center}
                className='main-container'
                zoom={this.props.zoom}>
                <TileLayer
                    attribution={MapConfig.attribution}
                    url={MapConfig.tileLayerUrl}
                />
            </Map>
        );
    }
}

export default BikesMap;