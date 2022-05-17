const express = require('express')
const router = express.Router()
const { logger } = require('../helpers/logger.helpers')

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json({})
  } catch (error) {
    next(error)
  }
})

module.exports = router
