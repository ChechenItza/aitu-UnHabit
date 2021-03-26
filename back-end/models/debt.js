const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const debtSchema = new mongoose.Schema({
  aituId: String,
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck'
  },
  action: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    bad: Boolean
  },
  date: Date
})

debtSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Debt', debtSchema)