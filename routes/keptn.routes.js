const express = require('express')
const router = express.Router()

const readController = require('../controllers/read.keptn.controller')
const createController = require('../controllers/create.keptn.controller')

router.use('/', readController)
router.use('/', createController)

module.exports = router
