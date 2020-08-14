import React, { Component } from 'react';

import { Chart, Cards, CountryPicker } from './components';

import { fetchData } from './api/index';

import coronaImage from './image/coronaImage.jpg';

import './App.modules.css';

import Map from './components/map'

import axios from 'axios'

import 'leaflet/dist/leaflet.css'

class App extends Component {
  state = {
    data: {},
    country: '',
    mapCenter:{lat:34.80746, lng: -40.4796},
    mapZoom:3,
    caseType:'recovered'
  };
  async componentDidMount() {
    const fetchedData = await fetchData();

    console.log(fetchedData)


    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    const getLatLong = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`)
    console.log(fetchedData)



    this.setState({ data: fetchedData, country: country, mapCenter:{lat:getLatLong.data.countryInfo.lat, lng:getLatLong.data.countryInfo.long}, mapZoom:3.5 });
  };

  getCardData = (value) =>   {
    this.setState({caseType:value})
    
  }
  

  render() {
    const { data, country, mapCenter, mapZoom, caseType } = this.state;
    console.log(caseType)
    return (
      <div className='container'>
        <img src={coronaImage} className='image' alt='idasd' />
        <Cards data={data}  getCardData={this.getCardData} />
        <CountryPicker handleChange={this.handleCountryChange} />

        <div className="mapChart">
        
        
        <Chart country={country} data={data} />

        <Map center={mapCenter} zoom={mapZoom} CASE={caseType}/>
        </div>
      </div>
    );
  }
}

export default App;
