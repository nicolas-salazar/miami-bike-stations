import React from 'react';

// Custom components:
import BikesMap from './components/BikesMap/Map';
import SearchBox from './components/SearchBox/SearchBox';

// Example data:
import exampleNetwork from './utils/exampleData';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            mapCenter: { lat: 25.790654, lng: -80.1300455, },
            mapZoom: 11,
        }
    }

    render() {
        return (
            <React.Fragment>

                <BikesMap
                    center={this.state.mapCenter}
                    zoom={this.state.mapZoom} />

                <SearchBox
                    focusOnStation={this.focusOnStation}
                    stations={exampleNetwork.stations}
                />
            </React.Fragment>
        );
    }

    // functionalities
    focusOnStation = (station) => {
        // console.log(station);
        this.setState({
            mapCenter: { lat: station.latitude, lng: station.longitude, },
            mapZoom: 18
        });
    }
}

export default App;
