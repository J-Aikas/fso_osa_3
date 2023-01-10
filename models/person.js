const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('failed to connect to MongoDB', err.message)
    console.log(url)
  })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: v => {
        return /^\d{2,3}-\d+$/.test(v)
      }
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)