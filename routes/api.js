const express = require ('express');
const router = express.Router();
const { param } = require('express-validator');
const { body } = require('express-validator');


const apiControllers = require('../controllers/api');
const { validateEmotion, validatePost } = require('./books.validations');

router.get('/books', apiControllers.getBooks);
router.get('/books/recommendations/:emotion', validateEmotion, apiControllers.getRecommendationBooks)
router.get('/books/recommendations/:emotion/random', validateEmotion, apiControllers.getRandomRecommendationBook)
router.post('/books', validatePost, apiControllers.postBook)

module.exports = router;