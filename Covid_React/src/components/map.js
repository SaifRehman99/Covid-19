import React, {useState, useEffect} from 'react'
import { Map as LeafletMap, TileLayer, Circle, Popup} from 'react-leaflet'

import { fetchCountryData } from './../api/index';
import axios from 'axios'


import './map.css'

const Mapp = ({center, zoom, CASE}) => {

  const [countries, setCountries] = useState([]);




  useEffect(() => {
    const fetchData = async () => {

    const getLatLong = await axios.get(`https://disease.sh/v3/covid-19/countries`)

      setCountries(getLatLong.data);
    };

    fetchData();

  }, [setCountries]);


  console.log(countries)

  const casesTypeColor = {

    recovered:{
      hex:'#7dd71d',
      multiplier:1200
    },
    deaths:{
      hex:'#190000',
      multiplier:2000
    }
,
    cases:{
      hex:'#FF0000',
      multiplier:800
    }
  }


 


  return (
    <div className="map">
    <LeafletMap center={center} zoom={zoom}>
    <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
  />

  {
    countries.map((country) => (
      <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColor[CASE].hex}
      fillColor={casesTypeColor[CASE].hex}
      radius={
        Math.sqrt(country[CASE]) * casesTypeColor[CASE].multiplier
      }
      >
      <Popup>
      <div className="info-container">
      <div
      className="info-flag"
      style={{backgroundImage: `url(${country.countryInfo.flag})`}}
      />
      <div className="info-name">{country.country}</div>
      <div className="info-confirmed">Cases:{country.cases}</div>
      <div className="info-recovered">Recovered:{country.recovered}</div>
      <div className="info-deaths">Deaths:{country.deaths}</div>
      </div>
      </Popup>

      </Circle>
    ))
  }

    </LeafletMap>
      
    </div>
  )
}

export default Mapp
