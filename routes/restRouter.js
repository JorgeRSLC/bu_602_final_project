// This file contains the RESTful API for the application.
const express = require('express');

const restRouter = express.Router();

restRouter.get('/', require('./catalog'));
restRouter.get('/:id', require('./catalogByID'));

module.exports = restRouter;