import React, { useState, useEffect } from 'react';
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [query, setQuery] = useState('')
  const APIKEY = "da3ec86825cb6c36e7fd77b24bf962ec"

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(response.data)
      setCountries(response.data)
    })
  }, [])

  const getGeoData = async (capital) => {
    const ans = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&appid=${APIKEY}`);
    var {lat, lon} = ans.data[0]
    console.log(lat, lon, lat.toFixed(2), lon.toFixed(2));
    return {lat, lon}
  }

  const getWeather = async () => {
    
  }
  const handleFilter = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
    const filtered = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(query.toLowerCase())
    })
    console.log(filtered);
    setFilteredList(filtered)

  }
  if (countries.length === 0) return (<div>Loading...</div>)



  return (
    <div className="">
      <h1>Country Data</h1>
      <p>
        Find countries with <input
          value={query}
          placeholder="Enter country name"
          onChange={handleFilter}
        />
      </p>
      <div>
        <h2>Results</h2>
        {
          filteredList.length > 10 ? <p>Too many matches, specify another filter</p> : <> {filteredList.map((country) => {
            return (
              <div key={country.name.common}>
                <span>{country.name.common}</span>
                <button onClick={() => {
                  setFilteredList([country])
                  getWeather(country.capital)
                }}>Show</button>
              </div>
            )
          })}
          </>
        }
        {
          filteredList.length === 1 ? <div>
            <h2>{filteredList[0].name.common}</h2>
            <p>Capital: {filteredList[0].capital}</p>
            <p>Population: {parseFloat(filteredList[0].population)}</p>
            <h3>Languages</h3>
            <ul>
              {Object.values(filteredList[0].languages).map((language) =>
                <li key={language}>{language}</li>
              )}
            </ul>
            <img src={filteredList[0].flags.png} alt="flag" width="100" style={{
              border: '1px solid black',
              borderRadius: '5px',
              boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.5)',
            }}
            />
            <h2>Weather in {filteredList[0].capital}</h2>
            {/* <p>Temperature: {
              getWeather(filteredList[0].capital).current.temp
            } </p>
            <p>Wind: {
              getWeather(filteredList[0].capital).current.wind_speed
            } </p> */}
          </div> : <></>
        }
      </div>

    </div>
  );
}

export default App;
