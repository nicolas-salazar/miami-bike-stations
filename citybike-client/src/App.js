import React from 'react';

// Custom components:
import BikesMap from './components/BikesMap/Map';
import SearchBox from './components/SearchBox/SearchBox';

// Example data:
import exampleNetwork from './utils/exampleData';

class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <BikesMap />
                <SearchBox stations={exampleNetwork.stations} />
            </React.Fragment>
        );
    }
}

export default App;
