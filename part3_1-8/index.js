const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('reqdata', function getData (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqdata'
))
app.use(express.json())

let persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
]

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  const generateRndId = () => {

    const min = Math.ceil(5);
    const max = Math.floor(100000);

    const rnd = Math.floor(Math.random() * (max - min) + min);
    console.log(rnd)

    return rnd
  }

checkForName = (body) => {
const names = persons.map(n => n.name)
if (names.includes(body.name))   {
return true
}

else    {
return false
}
} 

app.get('/api/persons', (req, res) => {
  res.json(persons)

})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
  
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
  })

app.get('/api/info', (req, res) => {

    const date = new Date()
    const id = generateId()

    res.send(`
    <h3>Phonebook has info for ${id} people</h3>
    <h3> ${date} </h3>
    `)
    
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })



app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
      }


    if (checkForName(body)) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      }

    const person = {
      name: body.name,
      number: body.number,
      id: generateRndId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})