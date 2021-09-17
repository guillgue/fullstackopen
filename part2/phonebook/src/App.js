import React, { useEffect, useState } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPersons = searchTerm === ''
    ? persons
    : persons.filter(
      person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const p = persons.find(p => p.name === newName)
    const confirmString =
      ' is already in the phonebook, replace the old number with a new one ?'
    if (p !== undefined && window.confirm(p.name + confirmString)) {
      const personObject = {
        ...p,
        number: newNumber
      }
      personService
        .update(p.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(
            person => person.id !== p.id ? person : returnedPerson
          ))
          setNewName('')
          setNewNumber('')
        })
    } else if (p === undefined) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = id => {
    personService
      .del(id).then(() => {
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={searchTerm}
        handleChange={handleSearchTermChange}
      />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleName={handleNameChange}
        handleNumber={handleNumberChange}
        handleSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons personList={filteredPersons} handleDelete={deletePerson} />
    </div>
  )
}

export default App
