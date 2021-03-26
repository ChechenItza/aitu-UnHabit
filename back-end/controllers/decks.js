const decksRouter = require('express').Router()
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

decksRouter.get('/', async (req, res) => {
  const aituId = getToken(req)
  if (!aituId)
    return res.status(401)

  const deck = await Deck.find({ aituId, archived: undefined })
  logger.log(deck)

  res.json(deck)
})

decksRouter.post('/', async (req, res) => {
  const aituId = getToken(req)
  if (!aituId)
    return res.status(401)

  const newDeck = new Deck({
    aituId,
    name: req.body.name,
    actions: req.body.actions,
  })

  const savedDeck = await newDeck.save()

  res.status(201).json(savedDeck)
})

decksRouter.delete('/:id', async (req, res) => {
  const aituId = getToken(req)
  if (!aituId)
    return res.status(401)

  const deck = await Deck.findById(req.params.id)
  deck.archived = true
  await deck.save()

  res.status(202).send()
})

module.exports = decksRouter