const Book = require('../models/book.model');
const { param } = require('express-validator');
const { body } = require('express-validator');

const allowedEmotions = ['Inspiration', 'Curiosity', 'Escapism', 'Nostalgia', 'Happiness', 'Sadness'];

exports.validateEmotion = [param('emotion').custom(async (value) =>{ 
    
    const books = await Book.find({ emotions: { $in: [value] } });
    if (books.length === 0) {
        return Promise.reject('No se encontraron libros con esa emoción');
      }
     
})];

exports.validatePost = [
  body('title').notEmpty().withMessage('El título es obligatorio')
    .isLength({ max: 50 }).withMessage('El título no debe exceder los 50 caracteres'),
  body('isbn').isLength({ min: 13, max: 13 }).withMessage('El ISBN debe tener 13 dígitos')
    .matches(/^[0-9]{13}$/).withMessage('El ISBN debe ser numérico y de 13 dígitos'),
  body('price').isFloat({ min: 0 }).withMessage('El precio debe ser positivo')
    .custom(value => {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        throw new Error('El precio debe tener como máximo dos decimales');
      }
      return true;
    }),
  body('description').notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ max: 4000 }).withMessage('La descripción no debe exceder los 4000 caracteres'),
  body('emotions').isArray().withMessage('Las emociones deben ser un array')
    .custom(emotions => {
      for (const emotion of emotions) {
        if (!allowedEmotions.includes(emotion)) {
          throw new Error(`Emoción no permitida: ${emotion}`);
        }
      }
      return true;
    })
];