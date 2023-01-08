const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('postData', (req) => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  },
  {
    name: "Aapo Ahti",
    number: "045 733 3332",
    id: 7
  },
  {
    name: "Matleena Höttövempula",
    number: "010 888 999",
    id: 8
  },
  {
    name: "George Boole",
    number: "050 1010101",
    id: 9
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const length = persons.length
  const date = new Date()
  res.send(`<p>Phonebook has info for ${length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
  const body = req.body

  if (persons.find(p => p.name === body.name)) {
    return res.status(409).json({
      error: 'name must be unique'
    })
  }

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: Math.round(Math.random()*1000000000)
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
