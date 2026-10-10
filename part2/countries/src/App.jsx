import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setValue(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  )

  return (
    <div>
      find countries <input value={value} onChange={handleSearchChange} />

      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        filteredCountries.map(country => (
          <div key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => setSelectedCountry(country)}>show</button>
          </div>
        ))
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <p>No matches found</p>
      )}
    </div>
  )
}

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  const capital = country.capital ? country.capital[0] : null
  const latlng = country.capitalInfo?.latlng

  useEffect(() => {
    if (latlng && api_key) {
      const [lat, lon] = latlng
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [latlng, api_key])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {capital}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.svg} alt="flag" width="150" />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>temperature {weather.main.temp} °C</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt="weather icon" 
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default App