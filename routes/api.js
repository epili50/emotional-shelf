const express = require ('express');
const router = express.Router();

const apiControllers = require('../controllers/api')

router.get('/books', apiControllers.getBooks);
router.get('/books/recomendations/:emotion', apiControllers.getRecomendationBooks)

module.exports = router;