import React from 'react'

const Filter = ({ value, handleChange }) => {
  return (
    <div>
      filter shown with&nbsp;
      <input
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter
