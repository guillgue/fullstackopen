import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryWeather = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital,
      units: 'm'
    }
    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  if (weather.current === undefined) {
    return (
      <div />
    )
  }

  console.log(weather)
  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <div>temperature: {weather.current.temperature} Celsius</div>
      <img
        src={weather.current.weather_icons[0]}
        alt='weather icon'
      />
      <div>
        wind: {weather.current.wind_speed} kph direction {weather.current.wind_dir}
      </div>
    </div>
  )
}

export default CountryWeather
