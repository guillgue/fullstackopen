import React from 'react'
import Person from './Person'

const Persons = ({ personList, handleDelete }) => (
  <div>
    {personList.map(person =>
      <Person
        key={person.id}
        person={person}
        handleDelete={() => handleDelete(person.id)}
      />
    )}
  </div>
)

export default Persons
