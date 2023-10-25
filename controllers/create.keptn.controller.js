const express = require('express')
const router = express.Router()
const logger = require('../service-library/helpers/logger.helpers')
const uriHelpers = require('../service-library/helpers/uri.helpers')
const stringHelpers = require('../service-library/helpers/string.helpers')
const axios = require('axios')

router.post('/keptn/:endpoint/:name', async (req, res, next) => {
  try {
    logger.debug("Endpoint: " +req.params.endpoint+ " - Name: " +req.params.name)

    const endpoint = (await secretHelpers.getEndpoint(req.params.endpoint)).data

    logger.debug(endpoint)

    const regex = /\[(.*)\](.*)/

    await axios.post(
      uriHelpers.concatUrl([
        endpoint.target,
        'api/v1/event']),
      req.body,
      {
        headers: {
          'x-token': endpoint.token
        }
      }
    )
    res.status(200).json({ message: 'Event triggered' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
