import React from 'react'
import Country from './Country'

const Countries = ({list}) => {
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
    }
    else if (list.length === 1) {
        return (
            <Country country={list[0]} full={true} />
        )
    }
    return (
        <div>
            {list.map(country =>
                <Country
                    key={country.name}
                    country={country} 
                    full={false} 
                />
            )}
        </div>
    )
}

export default Countries
