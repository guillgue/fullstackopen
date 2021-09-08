import React from 'react'
import Person from './Person'

const Persons = ({ personList }) => (
    <div>
        {personList.map(person =>
            <Person key={person.name} person={person} />
        )}
    </div>
)

export default Persons