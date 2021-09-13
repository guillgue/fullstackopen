import React from 'react'

const Country = ({ country, handleClick }) => {
    return (
        <div>
            {country.name}
            <button name={country.name} onClick={handleClick}>
                show
            </button>
        </div>
    )
}

export default Country
