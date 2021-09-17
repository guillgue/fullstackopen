import React from 'react'

const PersonForm =
  ({ name, number, handleName, handleNumber, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <div>
        name:&nbsp;
        <input
          value={name}
          onChange={handleName}
        />
      </div>
      <div>
        number:&nbsp;
        <input
          value={number}
          onChange={handleNumber}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )

export default PersonForm
