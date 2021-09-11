import React from 'react'

const Country = ({ country, full }) => {
    if (full) {
        return (
            <div>
                <h2>{country.name}</h2>
                <div>
                    capital {country.capital}
                </div>
                <div>
                    population {country.population}
                </div>
                <h3>languages</h3>
                <ul>
                    {country.languages.map(lang =>
                        <li key={lang.name}>
                            {lang.name}
                        </li>
                    )}
                </ul>
                <img 
                    src={country.flag} 
                    alt={country.name + " flag"} 
                    height={120}
                />
            </div>
        )
    }
    return (
        <div>
            {country.name}
        </div>
    )
}

export default Country
