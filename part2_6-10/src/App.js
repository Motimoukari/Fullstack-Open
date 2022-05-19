import { useState } from 'react'

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
      {props.persons.map(number => 
          <li key={number.name}>
            {number.name} {number.number}
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
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]

  const [persons, setPersons] = useState([...personlist])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewNumber] = useState('')
  const [filterInput, setFilter] = useState('')
  

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
      setPersons(persons.concat(nameObject))
    }

  setNewNumber('')
  setNewName('')
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
      <Persons persons={persons}/>
      
    </div>
  )

}

export default App