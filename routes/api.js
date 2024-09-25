const express = require ('express');
const router = express.Router();

const apiControllers = require('../controllers/api')

router.get('/books', apiControllers.getBooks);
router.get('/books/recommendations/:emotion', apiControllers.getRecommendationBooks)
router.get('/books/recommendations/:emotion/random', apiControllers.getRandomRecommendationBook)

module.exports = router;