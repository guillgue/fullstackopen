import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

  const filteredPersons = searchTerm === '' ?
    persons :
    persons.filter(
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
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({
        name: newName,
        number: newNumber
      }))
      setNewName('')
      setNewNumber('')
    }
  }

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
      <Persons personList={filteredPersons} />
    </div>
  )
}

export default App
