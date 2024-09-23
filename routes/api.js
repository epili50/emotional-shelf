const express = require ('express');
const router = express.Router();

const apiControllers = require('../controllers/api')

router.get('/books', apiControllers.getBooks);

module.exports = router;