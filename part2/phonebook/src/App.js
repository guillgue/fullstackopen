import React, { useEffect, useState } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)

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
          if (message !== null) {
            clearTimeout(message.timeoutID)
          }
          const timeoutID = setTimeout(() => {
            setMessage(null)
          }, 5000)
          setMessage({
            timeoutID,
            text: `Updated ${returnedPerson.name}`,
            error: false
          })
        })
        .catch((error) => {
          if (message !== null) {
            clearTimeout(message.timeoutID)
          }
          const timeoutID = setTimeout(() => {
            setMessage(null)
          }, 5000)
          setMessage({
            timeoutID,
            text: error.response.data.error,
            error: true
          })
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
          if (message !== null) {
            clearTimeout(message.timeoutID)
          }
          const timeoutID = setTimeout(() => {
            setMessage(null)
          }, 5000)
          setMessage({
            timeoutID,
            text: `Added ${returnedPerson.name}`,
            error: false
          })
        })
        .catch((error) => {
          if (message !== null) {
            clearTimeout(message.timeoutID)
          }
          const timeoutID = setTimeout(() => {
            setMessage(null)
          }, 5000)
          setMessage({
            timeoutID,
            text: error.response.data.error,
            error: true
          })
        })
    }
  }

  const deletePerson = id => {
    const { name: deletedName } = persons.find(p => p.id === id)
    personService
      .del(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        if (message !== null) {
          clearTimeout(message.timeoutID)
        }
        const timeoutID = setTimeout(() => {
          setMessage(null)
        }, 5000)
        setMessage({
          timeoutID,
          text: `deleted ${deletedName}`,
          error: false
        })
      })
      .catch((error) => {
        if (message !== null) {
          clearTimeout(message.timeoutID)
        }
        const timeoutID = setTimeout(() => {
          setMessage(null)
        }, 5000)
        setMessage({
          timeoutID,
          text: error.response.data.error,
          error: true
        })
        setPersons(persons.filter(p => p.id !== id))
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
      <Notification message={message} />
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
