import React from 'react';
import { Map, TileLayer, ZoomControl} from 'react-leaflet';

// Custom components:
import Station from './Station';

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
                zoomControl={false}
                zoom={this.props.zoom}>

                <TileLayer
                    attribution={MapConfig.attribution}
                    url={MapConfig.tileLayerUrl} />

                <ZoomControl
                    position='bottomright' />

                {
                    this.props.stations.map((station, i) => {
                        // if (i < 5) {
                        return (
                            <Station
                                item={station}
                                key={"stationMarker." + station.id}
                                lastFetch={this.props.lastFetch}
                                showBefore={this.props.showBefore} />
                        );
                        // }
                        // else {
                        //     return (
                        //         <React.Fragment
                        //             key={"stationMarker." + i} />
                        //     );
                        // }
                    })
                }
            </Map>
        );
    }
}

export default BikesMap;