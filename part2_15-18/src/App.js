import { useState, useEffect } from 'react'
import personService from './services/persons'

const FilterForm = (props) => {

  return (
  <div>
    filter shown with
    <input value={props.filterInput}
    onChange={props.handleFilter}/>
  </div>
    
  )
}

const Persons = (props) => {

  return (
    <div>
      <ul>
      {props.persons.map((number, index) => 
          <li key={number.name}>
            {number.name} {number.number}
            <button onClick={() => 
            {if (window.confirm(`Delete ${number.name} ?`))  {
              props.removeName(index+1)
            }}

            }>
              delete
            </button>
          </li>
          )}
      </ul>
    </div>
  )
}

const AddName = (props) => {

  return (
    <div>
      <form onSubmit={props.addName}>

    <div>
      name:
      <input value={props.newName}
      onChange={props.handleNameChange} />
    </div>

    <div>
   number:
    <input value={props.newPhone}
    onChange={props.handleNumberChange} />
    </div>

<div>
  <button type="submit">add</button>
</div>
</form>
    </div>
  )
}

const App = () => {

  const personlist = [
  ]

  const [persons, setPersons] = useState([...personlist])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewNumber] = useState('')
  const [filterInput, setFilter] = useState('')
  
  useEffect(() => {
    console.log('numbers_effect')
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)

    if (filterInput.length > 0) {
      setPersons(personlist.filter(person => person.name.includes(filterInput)))
    }

    else  {
      setPersons([...personlist])
    }
  }

  const removeName = (id) => {
  
    personService
      .remove(id)
      .then(returned => {
        setPersons(persons.concat(returned))
      })
    
  }

  const addName = (event) => {
    event.preventDefault()

    if (persons.filter(e => e.name === newName).length > 0) {
        alert(`${newName} is already added to phonebook`)
    }
    
    else  {
      const nameObject = {
        name: newName,
        number: newPhone,
      }

      personService
        .create(nameObject)
        .then(returned => {
          setPersons(persons.concat(returned))
          
        })
      
        setNewNumber('')
        setNewName('')
    }
      
    }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filterInput={filterInput} handleFilter={handleFilter}/>

      <h2>Add new</h2>
      <AddName addName={addName}
      newName={newName}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      newPhone={newPhone} />

      <h2>Numbers</h2>
      <Persons persons={persons} removeName={removeName}/>
      
    </div>
  )

}

export default App