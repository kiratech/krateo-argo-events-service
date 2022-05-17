const express = require('express')
const router = express.Router()

router.get('/ping', (req, res) => {
  res.status(200).send('Keptn Service')
})

router.get('/healthz', (req, res) => {
  res.status(200).send('Keptn Service')
})

module.exports = router
