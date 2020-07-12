import React, { Component } from 'react';

import { Chart, Cards, CountryPicker } from './components';

import { fetchData } from './api/index';

import coronaImage from './image/coronaImage.jpg';

import './App.modules.css';

class App extends Component {
  state = {
    data: {},
    country: '',
  };
  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className='container'>
        <img src={coronaImage} className='image' alt='idasd' />
        <Cards data={data} />
        <CountryPicker handleChange={this.handleCountryChange} />
        <Chart country={country} data={data} />
      </div>
    );
  }
}

export default App;
