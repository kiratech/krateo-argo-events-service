const express = require('express')
const router = express.Router()
const { logger } = require('../helpers/logger.helpers')
const uriHelpers = require('../helpers/uri.helpers')
const stringHelpers = require('../helpers/string.helpers')
const axios = require('axios')

router.post('/trigger/:endpoint/:name', async (req, res, next) => {
  try {
    const endpoint = JSON.parse(stringHelpers.b64toAscii(req.params.endpoint))
    const name = stringHelpers.b64toAscii(req.params.name)

    logger.debug(endpoint)

    const token = endpoint.secret.find((x) => x.key === 'token')

    const regex = /(?<=\[)[^\]\[]*(?=])/gm

    await axios.post(
      uriHelpers.concatUrl([endpoint.target, 'api/v1/event']),
      req.body,
      {
        headers: {
          'x-token': token.val
        }
      }
    )
    res.status(200).json({})
  } catch (error) {
    next(error)
  }
})

module.exports = router
