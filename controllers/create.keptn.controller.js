const express = require('express')
const router = express.Router()
const logger = require('../service-library/helpers/logger.helpers')
const uriHelpers = require('../service-library/helpers/uri.helpers')
const stringHelpers = require('../service-library/helpers/string.helpers')
const axios = require('axios')

router.post('/trigger/:endpoint/:name', async (req, res, next) => {
  try {
    const endpoint = JSON.parse(stringHelpers.b64toAscii(req.params.endpoint))
    // const name = stringHelpers.b64toAscii(req.params.name)

    logger.debug(endpoint)

    await axios.post(
      uriHelpers.concatUrl([endpoint.data.target, 'api/v1/event']),
      req.body,
      {
        headers: {
          'x-token': endpoint.data.token
        }
      }
    )
    res.status(200).json({ message: 'Event triggered' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
