const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://newlandian:${password}@cluster0.7svon8g.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  
  person.save().then(res => {
    console.log(`added ${res.name} ${res.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(res => {
    console.log('phonebook:')
    res.forEach(p => console.log(`${p.name} ${p.number}`))
    mongoose.connection.close()
  })
}