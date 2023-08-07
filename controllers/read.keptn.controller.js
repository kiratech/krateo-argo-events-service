const express = require('express')
const router = express.Router()
const logger = require('../service-library/helpers/logger.helpers')
const uriHelpers = require('../service-library/helpers/uri.helpers')
const secretHelpers = require('../service-library/helpers/secret.helpers')
const axios = require('axios')

router.get('/keptn/:endpoint/:name', async (req, res, next) => {
  try {
    logger.debug("Endpoint: " +req.params.endpoint+ " - Name: " +req.params.name)

    const endpoint = (await secretHelpers.getEndpoint(req.params.endpoint)).data

    logger.debug(endpoint)

    const regex = /\[(.*)\](.*)/gm

    logger.debug(req.params.name.match(regex))
    const projectName = req.params.name.match(regex)[1]
    const serviceName = req.params.name.match(regex)[2]

    logger.debug("project:" +projectName+ " - Service: "+serviceName)

    const prj = await axios.get(
      uriHelpers.concatUrl([
        endpoint.target,
        'api/controlPlane/v1/project',
        projectName
      ]),
      {
        headers: {
          'x-token': endpoint.token
        }
      }
    )

    res.status(200).json({
      ...prj.data,
      stages: prj.data.stages.map((x) => {
        return {
          ...x,
          services: x.services.filter((x) => x.serviceName === serviceName)
        }
      })
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
