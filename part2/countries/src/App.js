import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import SearchField from './components/SearchField'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleClick = (event) => {
    setSearch(event.target.name)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <SearchField value={search} onChange={handleSearchChange} />
      <Countries list={filteredCountries} handleClick={handleClick} />
    </div>
  )
}

export default App
