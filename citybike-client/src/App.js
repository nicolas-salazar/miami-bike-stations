import React from 'react';
import socketIOClient from 'socket.io-client';

// Custom components:
import BikesMap from './components/BikesMap/Map';
import SearchBox from './components/SearchBox/SearchBox';

// Example data:
import exampleNetwork from './utils/exampleData';
import TimeFilter from './components/TimeFilter/TimeFilter';

// Development helpers:
const allowFetchingData = true;

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            mapCenter: { lat: 25.790654, lng: -80.1300455, },
            mapZoom: 15,

            lastFetch: undefined,
            network: undefined,
            showBefore: undefined,
        };
    }

    render() {
        if (this.state.network && this.state.lastFetch) {
            return (
                <React.Fragment>
                    <BikesMap
                        center={this.state.mapCenter}
                        lastFetch={this.state.lastFetch}
                        showBefore={this.state.showBefore}
                        stations={this.state.network.stations}
                        zoom={this.state.mapZoom} />

                    <SearchBox
                        focusOnStation={this.focusOnStation}
                        stations={this.state.network.stations} />

                    <TimeFilter
                        showBefore={this.state.showBefore}
                        updateShowBefore={(newDate) => { this.setState({ showBefore: newDate }); }} />
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment />
            );
        }
    }

    // Data fetching:
    componentDidMount() {
        if (allowFetchingData) {
            const networkSocket = socketIOClient.connect('http://localhost:4001', { query: 'id=decobike-miami-beach' });

            networkSocket.on('dataUpdate', (data) => {
                console.log(data);
                this.setState({
                    network: data.network,
                    lastFetch: data.date
                });
            });
        }
        else {
            this.setState({
                network: { stations: exampleNetwork.stations },

                lastFetch: new Date(),
                showBefore: new Date('Sun Aug 05 2020 00:48:30 GMT-0500')
            });
        }
    }

    // Functionalities
    focusOnStation = (station) => {
        console.log(station);
        this.setState({
            mapCenter: { lat: station.latitude, lng: station.longitude, },
            mapZoom: 19
        });
    }
}

export default App;
