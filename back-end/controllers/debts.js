const debtsRouter = require('express').Router()
const Debt = require('../models/debt');
const Deck = require('../models/deck');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const logger = require('../utils/logger')

const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer'))
    return authorization.substring(7)

  return null
}

debtsRouter.get('/', async (req, res) => {
  const aituId = getToken(req)
  if (!aituId)
    return res.status(401)

  const debt = await Debt.find({ aituId }).populate('deck')

  res.json(debt)
})

debtsRouter.post('/:deckId/:actionId', async (req, res) => {
  const aituId = getToken(req)
  if (!aituId)
    return res.status(401)

  const deck = await Deck.findOne({ _id: req.params.deckId })
  const action = deck.actions.find(action => action._id.toString() === req.params.actionId)
  logger.log(action);

  const newDebt = new Debt({
    aituId,
    deck: mongoose.Types.ObjectId(req.params.deckId),
    action,
    date: new Date()
  })

  const savedDebt = await newDebt.save()

  res.status(201).json(savedDebt)
})

debtsRouter.delete('/:id', async (req, res) => {
  const aituId = getToken(req)
  if (!aituId)
    return res.status(401)

  await Debt.deleteOne({ _id: req.params.id })

  res.status(200).send()
})

module.exports = debtsRouter