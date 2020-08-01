// Main config for bike api fetching:
const apiFetchInterval = 5000;
const citybikeEndpoint = "http://api.citybik.es/v2/networks/decobike-miami-beach";

// Fetch utils:
const fetch = require('node-fetch');

class BikeStation {

    id = undefined;
    stationData = {
        free_bikes: 0
    };

    constructor(stationId) {
        this.id = stationId;
    }

    // Main listener: the one which should be called from server.js
    listenToUpdates = (callback) => {
        this.checkForUpdates(callback);
        setInterval(() => { this.checkForUpdates(callback); }, apiFetchInterval)
    }

    // Auxiliar methods:
    checkForUpdates = (callback) => {
        this.fetchStationData()
            .then(stationData => {
                stationData.free_bikes = this.stationData.free_bikes + 1;
                if (JSON.stringify(stationData) !== JSON.stringify(this.stationData)) {
                    this.stationData = stationData
                    callback(stationData);
                }
            })
            .catch(error => { console.log(error) });
    }

    fetchStationData = () => {
        return new Promise((resolve, reject) => {
            fetch(citybikeEndpoint)
                .then(apiResponse => {
                    apiResponse.json()
                        .then(bikeNetworkData => {
                            const networkStations = bikeNetworkData.network.stations;
                            const myBikeStation = networkStations.find(item => item.id === this.id);
                            resolve(myBikeStation);
                        })
                        .catch(error => { console.log(error); reject(error); })
                })
                .catch(error => { console.log(error); reject(error); })
        });
    }
}

module.exports = {
    BikeStation
}
