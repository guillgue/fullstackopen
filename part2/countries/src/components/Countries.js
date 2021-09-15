import React from 'react'
import Country from './Country'
import CountryFull from './CountryFull'

const Countries = ({ list, handleClick }) => {
  if (list.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (list.length === 0) {
    return (
      <div>
        No matches, specify another filter
      </div>
    )
  } else if (list.length === 1) {
    return (
      <CountryFull country={list[0]} />
    )
  }
  return (
    <div>
      {list.map(country =>
        <Country
          key={country.name}
          country={country}
          handleClick={handleClick}
        />
      )}
    </div>
  )
}

export default Countries
